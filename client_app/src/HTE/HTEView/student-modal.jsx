import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileViewer } from './file-viewer';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Mail, Phone, GraduationCap, BookOpen, Clock, CheckCircle, XCircle } from "lucide-react";

import FileManager from "@/components/FileManager";
export function StudentModal({
  student,
  isOpen,
  onClose,
  onApprove,
  onReject
}) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  if (!student) return null;

  console.log({ student })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {student.first_name} {student.last_name}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="flex-shrink-0">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="info" className="h-full overflow-auto">
              <Card className="w-full p-4 shadow-md rounded-2xl">
                <CardContent className="flex flex-col items-center text-center gap-4 w-full">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={student.proof_identity} alt="Student Profile" />
                    <AvatarFallback>{student.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2 w-full text-left">
                    <div className="flex items-center gap-2"><Mail className="w-5 h-5" /><strong>Email:</strong> {student.email}</div>
                    <div className="flex items-center gap-2"><Phone className="w-5 h-5" /><strong>Phone:</strong> {student.phone}</div>
                    <div className="flex items-center gap-2"><GraduationCap className="w-5 h-5" /><strong>College:</strong> {student.collegeName}</div>
                    <div className="flex items-center gap-2"><BookOpen className="w-5 h-5" /><strong>Program:</strong> {student.progName}</div>
                    <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><strong>Remaining Hours:</strong> {student.remaining_hours}</div>
                    <div className="flex items-center gap-2">
                      {student.is_verified ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                      <strong>Verified:</strong> {student.is_verified ? 'Yes' : 'No'}
                    </div>
                    {/* <div className="flex items-center gap-2">
                      {student.is_approved ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                      <strong>Approved:</strong> {student.is_approved ? 'Yes' : 'No'}
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="h-full">
              <div className="h-full">
                <FileManager
                  readOnly={true}
                  studentId={student.userID}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>



        <DialogFooter>
          <button
            className={`bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50`}
            onClick={async () => {
              setLoading(true);
              await onReject(student, 'Rejected');
              setLoading(false);
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin border-t-2 border-white w-4 h-4 border-solid rounded-full"></div>
            ) : (
              "Reject"
            )}
          </button>
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50`}

            onClick={async () => {
              setLoading(true);
              await onApprove(student);
              setLoading(false);
            }}

            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin border-t-2 border-white w-4 h-4 border-solid rounded-full"></div>
            ) : (
              "Approve"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
