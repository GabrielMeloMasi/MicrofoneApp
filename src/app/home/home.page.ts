import { Component } from '@angular/core';
import { VoiceRecorder, RecordingData } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  audioPath: string | null = null;

  constructor() {
    // Solicita permissão para gravar
    VoiceRecorder.requestAudioRecordingPermission();
  }

  async startRecording() {
    const result = await VoiceRecorder.startRecording();
    console.log('Gravação iniciada:', result);
  }

  async stopRecording() {
    const result: RecordingData = await VoiceRecorder.stopRecording();
    if (result.value && result.value.recordDataBase64) {
      // Salva o caminho do áudio gravado
      this.audioPath = `data:audio/aac;base64,${result.value.recordDataBase64}`;
    } else {
      console.error('Erro ao parar a gravação');
    }
  }

  async playRecording() {
    if (this.audioPath) {
      const audio = new Audio(this.audioPath);
      audio.play();
    }
  }
}
