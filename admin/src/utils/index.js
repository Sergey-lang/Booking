export  const createUploadData = (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'upload_custom');
  return data;
}
