export function uploadFile(file: File, type: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  return fetch(`http://localhost:8080/api/upload/${type}`, {
    method: 'POST',
    body: formData,
  });
}