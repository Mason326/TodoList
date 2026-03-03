import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, IconButton, Icon, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import blank from "../../../../assets/fileBlanket.jpg";
import { AnimationWrapping } from "./AnimationWrapping";
import { RecomendationsContext } from "../RecomendationsModal";

const thumbsContainerShow = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumbsContainerHide = {
  display: "none",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumb = {
  display: "inline-flex",
  position: "relative",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 5,
  marginRight: 8,
  width: 85,
  height: 85,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export function DragOverlay() {
  const { files, setFiles, previewDisplay, setPreviewDisplay, maxFilesCount } =
    useContext(RecomendationsContext);
  const {
    getRootProps,
    getInputProps,
    isDragGlobal,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (files.length + 1 > maxFilesCount) return;
      setFiles((prev) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
        return [...prev, ...newFiles];
      });
    },
  });

  useEffect(() => {
    setPreviewDisplay(!isDragGlobal);
  }, [isDragGlobal]);

  const extensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico"];

  const thumbs = files.map((file) => (
    <AnimationWrapping key={file.preview}>
      <div style={thumb} title={file.name}>
        <div style={thumbInner}>
          <img
            src={
              extensions.includes(file.name.split(".")[1])
                ? file.preview
                : blank
            }
            style={img}
            draggable={false}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
        <Box sx={{ top: -3, right: -3, position: "absolute" }}>
          <IconButton
            size="small"
            onClick={() =>
              setFiles((prev) => {
                const targetIndex = prev.findIndex(
                  (item) => item.preview == file.preview,
                );
                const copy = [...prev];
                copy.splice(targetIndex, 1);
                URL.revokeObjectURL(file.preview);
                return copy;
              })
            }
            sx={{
              p: "2px",
              color: "common.white",
              border: "none",
              bgcolor: "GrayText",
              "&:hover": {
                bgcolor: "gray",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </div>
      <Typography
        sx={{
          width: "100px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center",
          fontSize: 14,
        }}
        title={file.name}
        color="text.secondary"
      >
        {file.name}
      </Typography>
    </AnimationWrapping>
  ));

  return (
    <div style={{ minHeight: "3vh", padding: "0px 20px" }}>
      <section className="container">
        <div
          {...getRootProps({
            className: "dropzone",
            style: {
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "40px",
              textAlign: "center",
              backgroundColor: isDragAccept
                ? "#d4edda"
                : isDragReject
                  ? "#f8d7da"
                  : "white",
              transition: "all 0.2s",
              display: isDragGlobal ? "block" : "none",
            },
          })}
        >
          {/* Status indicators */}
          {isDragGlobal && !isDragActive && (
            <p style={{ color: "#007bff", fontWeight: "bold" }}>
              🌐 Drag detected on page!
            </p>
          )}

          {isDragActive && !isDragAccept && !isDragReject && (
            <p style={{ color: "#6c757d" }}>Drop files here...</p>
          )}

          {isDragAccept && (
            <p style={{ color: "#28a745", fontWeight: "bold" }}>
              ✅ Drop to upload these files
            </p>
          )}

          {isDragReject && (
            <p style={{ color: "#dc3545", fontWeight: "bold" }}>
              ❌ Some files will be rejected
            </p>
          )}

          {!isDragGlobal && !isDragActive && (
            <>
              <p>Drag 'n' drop images here</p>
              <em>
                ({maxFilesCount} files are the maximum number of files you can
                drop here)
              </em>
            </>
          )}
        </div>

        <aside
          style={previewDisplay ? thumbsContainerShow : thumbsContainerHide}
        >
          {thumbs}
        </aside>
      </section>
    </div>
  );
}
