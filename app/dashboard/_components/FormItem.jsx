import { Button } from '@/components/ui/button';
import { Edit, Share, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from '@clerk/nextjs';
import { db } from '@/config';
import { and, eq } from 'drizzle-orm';
import { forms } from '@/config/schema';
import { toast } from 'sonner';
import { RWebShare } from 'react-web-share';

function FormItem({ form, formRecord, refreshData }) {
  const { user } = useUser();

  const onDeleteForm = async () => {
    const result = await db
      .delete(forms)
      .where(and(eq(forms.id, formRecord.id)), eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress));
    if (result) {
      toast('Form Deleted Successfully');
      refreshData();
    }
  };

  
  

  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-6 space-y-4 bg-white">
      <div className="flex justify-between">
        <h2></h2>

        <AlertDialog>
          <AlertDialogTrigger>
            <h2>
              <Trash className="h-5 w-5 text-red-500 cursor-pointer" />
            </h2>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div>
        <h2 className="font-semibold text-xl text-gray-900">{form?.form_title}</h2>
        <h3 className="text-sm text-gray-600">{form?.form_subheading}</h3>
      </div>

      <div className="flex space-x-4">
        <div>
          {/* Wrap Button with RWebShare */}
          <RWebShare
            data={{
              text: form?.form_subheading + ", Build your form in seconds",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}aiform/${formRecord?.id}`,
              title: form?.form_title,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button
              variant="outline"
              className="flex items-center space-x-2 hover:bg-blue-100 focus:outline-none"
              aria-label="Share form"
            >
              <Share className="text-blue-500" />
              <span>Share</span>
            </Button>
          </RWebShare>
        </div>

        <Link href={'/edit-style/' + formRecord?.id}>
          <Button
            variant="outline"
            className="flex items-center space-x-2 hover:bg-green-100 focus:outline-none"
            aria-label="Edit form"
          >
            <Edit className="text-green-500" />
            <span>Edit</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FormItem;
