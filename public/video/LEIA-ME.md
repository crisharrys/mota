# Vídeo do hero

Coloque aqui:

- `sala.mp4`  — H.264 (obrigatório)
- `sala.webm` — VP9 (opcional, melhora a compressão)

Assim que `sala.mp4` existir, o site passa a usar o vídeo automaticamente.
Enquanto não existir, o hero cai para a cena 3D — nada quebra.

## Especificação

| item        | valor                                             |
|-------------|---------------------------------------------------|
| duração     | 8 a 12 segundos                                   |
| resolução   | 1920x1080 (ou 1440x1080 se for enquadrar vertical)|
| fps         | 30                                                |
| áudio       | nenhum — remova a faixa                           |
| peso alvo   | até 6 MB                                          |
| conteúdo    | sala bonita indo de dia ensolarado → noite aconchegante |

## Importante: o vídeo é percorrido pelo scroll, não tocado

Para o navegador conseguir pular para qualquer instante sem engasgar, o
arquivo precisa de **keyframe em todo quadro**. Sem isso o scrub trava.

```bash
ffmpeg -i entrada.mp4 -an -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 23 -g 1 -keyint_min 1 -movflags +faststart public/video/sala.mp4
```

```bash
ffmpeg -i entrada.mp4 -an -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 34 -b:v 0 -g 1 public/video/sala.webm
```

O `-g 1` é o que importa: um keyframe por quadro.
