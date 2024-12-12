const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setMessages([
      ...messages,
      { type: "user", content: `File uploaded: ${file.name}` },
    ]);
  }
};

const toggleRecording = async () => {
  if (!isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, {
          type: "audio/mp3",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "user",
            audioUrl: audioUrl,
          },
        ]);
        // transcribeAudio(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      console.log("Started recording");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  } else {
    mediaRecorder.current.stop();
    setIsRecording(false);
    console.log("Stopped recording");
  }
};

const transcribeAudio = async (audioBlob) => {
  setIsTranscribing(true);
  try {
    // Convert Blob to ArrayBuffer
    const arrayBuffer = await audioBlob.arrayBuffer();

    const uint8FromBuffer = new Uint8Array(arrayBuffer);

    setIsTranscribing(false);
  } catch (error) {
    console.error("Error during transcription:", error);
    setIsTranscribing(false);
  }
};

// const speechConfig = SpeechConfig.fromSubscription(
//   "12122e3474ae470ba8cf16af7ed4ee93",
//   "francecentral"
// );

// // Convert the audio blob to an ArrayBuffer
// const arrayBuffer = await audioBlob.arrayBuffer();

// // Create a PushAudioInputStream
// const pushStream = AudioInputStream.createPushStream();

// // Push the audio data to the stream
// pushStream.write(arrayBuffer);
// pushStream.close();

// // Create AudioConfig from the push stream
// const audioConfig = AudioConfig.fromStreamInput(pushStream);

// const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

// recognizer.recognizeOnceAsync(
//   (result) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { type: "user", content: `Azure Transcription: ${result.text}` },
//     ]);
//     console.log("Transcription result:", result);
//     setIsTranscribing(false);
//   },
//   (error) => {
//     console.error("Error transcribing audio:", error);
//     setIsTranscribing(false);
//   }
// );
// const recognizer = new SpeechToText.Recognizer();

// // Convert the audio blob to an ArrayBuffer
// const arrayBuffer = await audioBlob.arrayBuffer();

// // Start recognition
// recognizer.start(arrayBuffer);

// recognizer.on("data", (result) => {
//   setMessages((prevMessages) => [
//     ...prevMessages,
//     { type: "user", content: `Transcription: ${result}` },
//   ]);
//   console.log("Transcription result:", result);
//   setIsTranscribing(false);
// });

// recognizer.on("error", (error) => {
//   console.error("Error transcribing audio:", error);
//   setIsTranscribing(false);
// });

// recognizer.on("end", () => {
//   console.log("Transcription ended");
// });

// const credential = new AzureKeyCredential(
//   "12122e3474ae470ba8cf16af7ed4ee93"
// );
// const client = new OpenAIClient(
//   "https://azure-openai-instance-france-central.openai.azure.com/",
//   credential
// );

// const base64Audio = await audioBlobToBase64(audioBlob);

// const transcription = await client.audioTranscription({
//   audio: {
//     content: base64Audio,
//   },
//   config: {
//     encoding: "LINEAR16",
//     sampleRateHertz: 16000,
//     languageCode: "en-US",
//   },
// });

// setMessages((prevMessages) => [
//   ...prevMessages,
//   { type: "user", content: `Transcription: ${transcription.text}` },
// ]);
// console.log("Transcription result:", transcription);
