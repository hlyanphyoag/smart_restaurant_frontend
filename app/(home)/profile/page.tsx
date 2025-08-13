"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Edit2, Save, X, UserIcon, Mail, Phone } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/AuthStore";
import { User } from "@/types/user";

type UpdateUserData = {
  name?: string;
  profilePic?: string | null;
  phone?: string | null;
};

const ProfilePage = () => {
  const { authUser, setAuthUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserData>({
    name: "",
    profilePic: null,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name,
        profilePic: authUser.profilePic,
      });
    }
  }, [authUser]);

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (updatedData: UpdateUserData) => {
      const res = await api.patch<User>(
        `/api/users/${authUser?.id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: (data) => {
      setAuthUser(data);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    try {
      const res = await api.post("/api/imagekit/upload", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = res.data.url || res.data.filePath || res.data.imageUrl;
      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
      toast.success("Image uploaded successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  const handleCancelEdit = () => {
    if (authUser) {
      setFormData({
        name: authUser.name,
        profilePic: authUser.profilePic,
      });
    }
    setIsEditing(false);
  };

  if (authUser)
    return (
      <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg sm:shadow-2xl rounded-lg sm:rounded-2xl overflow-hidden border border-green-200 transition-transform hover:scale-[1.01] active:scale-[0.99]">
            <CardHeader className="bg-gradient-to-r p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold sm:font-extrabold tracking-tight animate-fade-in">
                  Welcome, {authUser.name.split(" ")[0]}!
                </CardTitle>
                {!isEditing ? (
                  <Button
                    variant="default"
                    className="bg-green-400 hover:bg-green-500 text-white font-semibold shadow-md w-full sm:w-auto"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-50 font-semibold w-full sm:w-auto"
                    onClick={handleCancelEdit}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
                {/* Profile Picture */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
                  <div className="relative group">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border-4 border-green-400 shadow-lg sm:shadow-xl transition-all group-hover:ring-4 group-hover:ring-green-300">
                      {authUser.profilePic ? (
                        <img
                          src={authUser.profilePic}
                          alt={authUser.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <UserIcon className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-400 group-hover:text-green-500 transition-colors" />
                      )}
                    </div>
                    {isEditing && (
                      <div className="mt-3 sm:mt-4 flex flex-col gap-2">
                        <Label
                          htmlFor="profilePicUpload"
                          className="text-green-700 text-sm sm:text-base"
                        >
                          Upload Profile Picture
                        </Label>
                        <Input
                          id="profilePicUpload"
                          name="profilePicUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="mt-1 border-green-400 focus:ring-green-400 text-xs sm:text-sm"
                          disabled={uploading}
                        />
                        {uploading && (
                          <span className="text-xs text-green-500 flex items-center gap-1">
                            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />{" "}
                            Uploading...
                          </span>
                        )}
                        <span className="text-xs text-green-500">
                          Choose an image to upload as your profile picture.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-grow">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">
                      Account Details
                    </h3>
                    <hr className="border-green-200 mb-3 sm:mb-4" />
                  </div>
                  {isEditing ? (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <Label
                            htmlFor="name"
                            className="text-green-700 text-sm sm:text-base"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 border-green-400 focus:ring-green-400 text-sm sm:text-base"
                          />
                          <span className="text-xs text-green-500">
                            Your real name helps us personalize your experience.
                          </span>
                        </div>
                      </div>

                      <div className="pt-1 sm:pt-2">
                        <Button
                          type="submit"
                          disabled={updateUserMutation.isPending}
                          className="w-full md:w-auto bg-green-400 hover:bg-green-500 text-white font-semibold shadow flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          {updateUserMutation.isPending ? (
                            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          )}
                          Save Changes
                          {updateUserMutation.isSuccess && (
                            <span className="ml-2 text-green-600 animate-bounce">
                              &#10003;
                            </span>
                          )}
                        </Button>
                        <span className="block text-xs text-green-400 mt-1 sm:mt-2">
                          All changes are saved securely.
                        </span>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h2 className="text-2xl sm:text-3xl font-bold sm:font-extrabold text-green-900">
                          {authUser.name}
                        </h2>
                        <span className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-bold bg-green-100 text-green-700 rounded-full border border-green-400 shadow w-fit">
                          {authUser.role}
                        </span>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2 text-green-700 text-sm sm:text-base">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                          <span>{authUser.email}</span>
                        </div>

                        <div className="text-xs sm:text-sm text-green-600">
                          Member since:{" "}
                          {new Date(authUser.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-green-100 px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t border-green-200">
              <div className="text-xs sm:text-sm text-green-700 flex items-center gap-2">
                Last updated: {new Date(authUser.updatedAt).toLocaleString()}
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
};

export default ProfilePage;
