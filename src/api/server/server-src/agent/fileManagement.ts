// export async function prepareFileForAgent(
// ) {
//   console.log(content);
//   const fileSizeMB = fileSize / (1024 * 1024);

//   if (fileSizeMB > 2) {
//     const formData = new FormData();
//     formData.append("purpose", "user_data");
//     formData.append("file", new Blob([content]), filePath.split("/").pop());

//     const response = await fetch("https://api.openai.com/v1/files", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: formData,
//     });

//     const { id: fileId } = await response.json();
//     return { type: "input_file", file_id: fileId };
//   } else {
//     const ext = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();

//     const mimeType = mimeTypes[ext] || "text/plain";
//     const base64 = Buffer.from(content).toString("base64");
//     const dataUrl = `data:${mimeType};base64,${base64}`
//       .replace(/\s+/g, "")
//       .replace(/[\n\r]/g, "");

//     return {
//       type: "input_text",
//       text: ,
//     };
//   }
// }
