"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAdminVideoQuery,
  useUpdateVideoMutation,
} from "@/store/slices/admin/video";
import { TextField, Button } from "@mui/material";
import MultiSelect from "@/components/MultiSelect";
import Select from "@/components/Select";
import DateTimePicker from "@/components/DateTimePicker";

const CUSTOMER = "customer-ae2phsrffw6ivfgf.cloudflarestream.com";

const DANCE_STYLES = ["Bachata", "Salsa", "Zouk"];
const RECORD_TYPES = ["Party", "Workshop", "Course", "Practice"];
const LOCATIONS = ["沙野", "台南文創園區", "Salsa 6", "Social Hub", "Banana"];

const AdminVideoEdit = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: video } = useGetAdminVideoQuery(id);
  const [updateVideo] = useUpdateVideoMutation();
  const [filename, setFilename] = useState("");
  const [danceStyle, setDanceStyle] = useState("");
  const [dancerNames, setDancerNames] = useState([]);
  const [recordType, setRecordType] = useState("");
  const [location, setLocation] = useState("");
  const [recordedAt, setRecordedAt] = useState("");

  useEffect(() => {
    if (!video) return;

    setFilename(video.filename);
    setDanceStyle(video.danceStyle);
    setDancerNames(video.dancerNames);
    setRecordType(video.recordType);
    setLocation(video.location);
    setRecordedAt(video.recordedAt);
  }, [video]);

  const handleSave = async () => {
    await updateVideo({
      id,
      data: {
        filename,
        danceStyle,
        dancerNames,
        recordType,
        location,
        recordedAt,
      },
    });
    router.push(`/admin/videos`);
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button
        variant="text"
        onClick={() => router.push(`/admin/videos`)}
      >
        Back
      </Button>
      <div className=" flex gap-5 p-4 ">
        <div className="relative">
          <div className="w-62 h-110 rounded-t-md  overflow-hidden">
            <iframe
              src={`https://${CUSTOMER}/${video.uid}/iframe?autoplay=true`}
              loading="lazy"
              className="w-full h-full border-0"
              allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <div className={`absolute left-3 top-3 z-20 opacity-50`}></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <TextField
            label="Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <Select
            label="Dance Style"
            options={DANCE_STYLES}
            value={danceStyle}
            onChange={(newValue) => setDanceStyle(newValue)}
          />
          <MultiSelect
            onChange={(newValue) =>
              setDancerNames(newValue.map((item) => item.value))
            }
            defaultDancerNames={video.dancerNames}
          />
          <Select
            label="類型"
            options={RECORD_TYPES}
            value={recordType}
            onChange={(newValue) => setRecordType(newValue)}
          />
          <Select
            label="場地"
            options={LOCATIONS}
            value={location}
            onChange={(newValue) => setLocation(newValue)}
          />
          <DateTimePicker
            datetime={video.recordedAt}
            onChange={(newValue) => setRecordedAt(newValue)}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminVideoEdit;
