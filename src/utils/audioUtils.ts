/**
 * Utility to convert raw 16-bit PCM (e.g. 24000Hz from Gemini TTS) to a standard WAV Blob.
 * Allows instant, native, lag-free playback via HTMLAudioElement or Web Audio.
 */
export function pcmBase64ToWavBlob(
  base64Pcm: string,
  sampleRate: number = 24000,
  numChannels: number = 1
): Blob {
  const binaryString = atob(base64Pcm);
  const pcmLen = binaryString.length;
  const pcmBytes = new Uint8Array(pcmLen);
  for (let i = 0; i < pcmLen; i++) {
    pcmBytes[i] = binaryString.charCodeAt(i);
  }

  // Create 44-byte WAV header
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcmLen, true); // ChunkSize
  writeString(view, 8, 'WAVE');

  // "fmt " sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * 2, true); // ByteRate
  view.setUint16(32, numChannels * 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  // "data" sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, pcmLen, true); // Subchunk2Size

  return new Blob([header, pcmBytes], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
