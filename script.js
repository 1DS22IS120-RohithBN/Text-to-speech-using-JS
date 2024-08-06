let speech = new SpeechSynthesisUtterance();
        let btn = document.querySelector("button");
        let voices = [];
        let voiceselect = document.querySelector("select");

        function populateVoiceList() {
            voices = window.speechSynthesis.getVoices();
            voiceselect.innerHTML = ''; // Clear the select options
            voices.forEach((voice, i) => {
                let option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.value = i;
                voiceselect.appendChild(option);
            });
            if (voices.length > 0) {
                speech.voice = voices[0]; // Set the default voice
            }
        }

        populateVoiceList();
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }

        voiceselect.addEventListener("change", () => {
            speech.voice = voices[voiceselect.value];
        });

        function getspeech() {
            const synth = window.speechSynthesis;
            let text = document.querySelector("textarea").value;
            speech.text = text;
            synth.speak(speech);
        }

        btn.addEventListener("click", getspeech);