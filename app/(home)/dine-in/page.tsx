import { useTableQuery } from '@/services/TableServices/table.query';
import { useTableStore } from '@/store/useTableStore';
import Link from 'next/link';
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react'; // Importing Lucide icons
import TableCard from '@/app/(home)/component/TableCard';

const page = () => {

    return (
        <TableCard />
    );
};

export default page;
