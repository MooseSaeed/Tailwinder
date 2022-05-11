<template>
  <div
    type="button"
    class="flex flex-col w-fit gap-1 mb-10 sm:flex-row items-center font-semibold text-white text-bold bg-gradient-to-br from-gray-800 to-gray-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-1 text-center"
  >
    Transcribe Audio
    <select
      class="max-w-max block w-full px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      name="lang"
      id="lang"
    >
      <option value="en">General English</option>
      <option value="en-US">United States - English</option>
      <option value="en-GB">United Kingdom - English</option>
      <option value="en-AU">Australia - English</option>
      <option value="en-IN">India - English</option>
      <option value="en-NZ">New Zealand - English</option>
      <option value="uk">Ukrainian</option>
      <option value="fr">French</option>
      <option value="fr-CA">Canada - French</option>
      <option value="de">German</option>
      <option value="ru">Russian</option>
      <option value="es">Spanish</option>
      <option value="es-419">Latin America - Spanish</option>
      <option value="hi">Hindi</option>
      <option value="nl">Dutch</option>
    </select>

    <div class="relative">
      <Stoprecroding v-if="recording" @click="toggleRecording" />
      <Stoprecroding
        @click="toggleRecording"
        v-if="recording"
        class="animate-ping absolute top-0 right-0"
      />
    </div>

    <Microphone v-if="!recording" @click="toggleRecording" />
  </div>
</template>

<script>
import Microphone from "./Microphone.vue";
import Stoprecroding from "./Stoprecroding.vue";
export default {
  components: { Microphone, Stoprecroding },

  data() {
    return {
      recording: false,
      lang: "",
      socket: null,
      stream: null,
    };
  },
  methods: {
    toggleRecording() {
      this.recording = !this.recording;
      if (this.recording) {
        this.initRecorder();
      } else {
        this.stopRecording();
      }
    },

    initRecorder() {
      this.startTranscript();
    },

    // look for any active streams and stop them
    stopRecording() {
      this.socket.close;
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    },

    // Catch audio from microphone and send to Deepgram
    startTranscript() {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          this.stream = stream;
          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "audio/webm",
          });

          const language = document.querySelector("select").value;

          const socket = new WebSocket(
            "wss://api.deepgram.com/v1/listen?language=" + language,
            ["token", process.env.VUE_APP_DEEPGRAM_KEY]
          );

          this.socket = socket;

          socket.onopen = () => {
            mediaRecorder.addEventListener("dataavailable", (event) => {
              socket.send(event.data);
            });

            mediaRecorder.start(250);
          };

          socket.onmessage = (message) => {
            const received = JSON.parse(message.data);
            const transcript = received.channel.alternatives[0].transcript;
            if (transcript && received.is_final) {
              document.querySelector("#dicussion_content").textContent =
                transcript;
            }
          };
        });
    },
  },
};
</script>

<style></style>
