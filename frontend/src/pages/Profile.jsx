import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Banner from '@/assets/banner.jpeg'
import {
  Contact,
  Download,
  FileText,
  Mail,
  Pen,
} from 'lucide-react';

import React, { useState } from 'react';
import AppliedJobTable from '@/components/AppliedJobTable';
import UpdateProfileDialog from '@/components/UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJob from '@/hooks/useGetAppliedJob';

const Profile = () => {
  useGetAppliedJob();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const skills = user?.profile?.skills || [];

  return (
    <div className="min-h-screen bg-background py-5 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-5">

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">

          {/* Cover */}
          <div className="h-28 sm:h-36 w-full overflow-hidden">
            <img
              src={Banner}
              alt="Profile banner"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Profile Header */}
          <div className="px-5 sm:px-8 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">

              <div className="flex flex-col sm:flex-row sm:items-end gap-4">

                <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-md">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />

                  <AvatarFallback className="text-2xl font-semibold bg-[#07AAA5] text-white">
                    {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="pb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {user?.fullname || 'User'}
                  </h1>

                  <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                    {user?.profile?.bio || 'No bio added yet.'}
                  </p>
                </div>

              </div>

              <Button
                variant="outline"
                className="gap-2 self-start sm:self-auto cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Pen className="h-4 w-4" />
                Edit Profile
              </Button>

            </div>
            {/* rest of file unchanged from here (Contact grid, Skills, Resume, etc.) */}
            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">

              <div className="flex items-center gap-3 rounded-xl border p-3 bg-muted/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#07AAA5]/10 text-[#07AAA5]">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="text-sm font-medium truncate">
                    {user?.email || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border p-3 bg-muted/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#07AAA5]/10 text-[#07AAA5]">
                  <Contact className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <p className="text-sm font-medium">
                    {user?.phoneNumber || 'N/A'}
                  </p>
                </div>
              </div>

            </div>

            {/* Skills */}
            <div className="mt-7">
              <h2 className="font-semibold text-lg">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2 mt-3">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1.5 rounded bg-[#07AAA5]/10 text-[#078f8b] dark:text-[#38c7c2] border border-[#07AAA5]/20"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No skills added yet.
                  </p>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="mt-7">
              <h2 className="font-semibold text-lg mb-3">
                Resume
              </h2>

              {user?.profile?.resume ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border p-4 bg-muted/30">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user?.profile?.resumeOriginalName || 'My Resume'}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Resume document
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-2 shrink-0">

                    <a
                      href={user.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 cursor-pointer"
                      >
                        <FileText className="h-4 w-4" />
                        View
                      </Button>
                    </a>

                    <a
                      href={user.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Button
                        size="sm"
                        className="gap-2 bg-[#07AAA5] hover:bg-[#078f8b] text-white cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </a>

                  </div>

                </div>
              ) : (
                <div className="rounded-xl border border-dashed p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground" />

                  <p className="mt-2 text-sm text-muted-foreground">
                    No resume uploaded yet.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Applied Jobs */}
        <div className="mt-8">

          <div className="mb-4">
            <h2 className="text-xl font-bold">
              Applied Jobs
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Track the jobs you have applied for.
            </p>
          </div>

          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <AppliedJobTable />
          </div>

        </div>

      </div>

      <UpdateProfileDialog
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Profile;