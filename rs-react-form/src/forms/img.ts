const fileToBase64 = async (file: File, maxMB = 2) => {
  if (!['image/png', 'image/jpeg'].includes(file.type))
    throw new Error('Only PNG/JPEG');
  if (file.size > maxMB * 1024 * 1024) throw new Error(`File > ${maxMB} MB`);
  const buf = await file.arrayBuffer();
  const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
  return `data:${file.type};base64,${b64}`;
};

export default fileToBase64;
