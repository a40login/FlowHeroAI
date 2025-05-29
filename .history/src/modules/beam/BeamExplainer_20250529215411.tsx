import * as React from 'react';

import type { SxProps } from '@mui/joy/styles/types';
import { Box } from '@mui/joy';

import { ExplainerCarousel, ExplainerPage } from '~/common/components/ExplainerCarousel';
import { animationEnterScaleUp } from '~/common/util/animUtils';


const beamSteps: ExplainerPage[] = [
  {
    stepDigits: '',
    stepName: 'Willkommen',
    // titlePrefix: 'Welcome to Beam.', //  Better answers, faster.
    titlePrefix: 'Willkommen bei ', titleSpark: 'Beam',
    // titleSpark: 'B E A M',
    // titleSuffix: ' azing',
    // titleSquircle: true,
    mdContent: `
**Beam** ist eine Chat-Modalität in FlowHero, um mehrere KI-Modelle [gemeinsam](https://big-agi.com/blog/beam-multi-model-ai-reasoning) einzusetzen.

Es ist wie ein Brainstorming mit mehreren klugen Köpfen,
jeder mit seiner eigenen einzigartigen Perspektive.
Beam lässt Sie das Beste aus allen herausholen.

![big-AGI BEAM Rays](https://big-agi.com/app/journeys/beam/explainer-beam-scatter-1200px-alpha.png)

`, // Let&apos;s get you to better chat answers, faster.
  },
  {
    stepDigits: '01',
    stepName: 'Beam',
    titlePrefix: 'Erkunden mit ', titleSpark: 'Beam', titleSuffix: '.',
    // titleSpark: 'Beaming', titleSuffix: ': Exploration',
    mdContent: `
**Beaming ist die Explorationsphase**, in der KI-Modelle Ideen generieren.

Wählen Sie einfach die KI-Modelle aus, die Sie verwenden möchten (Sie können Kombinationen laden/speichern) und starten Sie sie.
Sie können dann eine einzelne Antwort auswählen, um den Chat fortzusetzen,
oder die Antworten behalten, die Ihnen gefallen, und eine Zusammenführung durchführen.

**Wichtig:** _Am besten in früheren / kürzeren Chats verwenden_. 💰 Vorsicht beim Token-Verbrauch von Beaming und Zusammenführen;
da es sich um parallele und längere Operationen handelt, verbrauchen sie mehr Token als reguläre Chats.

Verwenden Sie eine Mischung aus verschiedenen KI-Modellen, um eine vielfältige Sammlung von Ideen und Perspektiven zu erhalten.
`, // and delete the ones that aren't helpful
  },
  {
    stepDigits: '02',
    stepName: 'Zusammenführen',
    titlePrefix: 'Kombinieren mit ', titleSpark: 'Zusammenführen', titleSuffix: '.',
    // titleSpark: 'Merging', titleSuffix: ': Synthesis', // Synthesis, Convergence
    mdContent: `
Zusammenführen bedeutet, **die besten Teile jeder Antwort zu einer großartigen, kohärenten Antwort zu kombinieren**.

Sie können aus verschiedenen Zusammenführungsoptionen wählen, darunter **Fusion**, **Checkliste**, **Vergleichen** und **Benutzerdefiniert**.
Experimentieren Sie mit verschiedenen Optionen, um diejenige zu finden, die am besten zu Ihrem Chat passt.

![big-AGI BEAM Rays](https://big-agi.com/app/journeys/beam/explainer-beam-gather-1600px-alpha.png)
    `, // > Merge until you have a single, high-quality response. Or choose the final response manually, skipping merge.
  },
//   {
//     stepDigits: '',
//     stepName: 'Tipps',
//     titleSuffix: 'Tipps zur Effektivität', //  · N × GPT-4 -> GPT-5
//     mdContent: `
// #### Mensch als Richter
// Sie, der Benutzer, geben die kreative Richtung und das endgültige Urteil vor. Die KI-Modelle sind leistungsstarke Werkzeuge, die Entwürfe für Sie generieren, die Sie schnell bewerten und verfeinern können.
// Es gibt tiefgreifende Gründe, warum dieser Ansatz funktioniert, die wir [in unserem Blog](https://big-agi.com/blog/introducing-beam) untersuchen.
//
// #### Beste Nutzung
// Dieses Tool ist für die **frühen Phasen** eines Prozesses konzipiert, in denen es unvergleichliche Einblicke und Perspektiven genau dort bietet, wo Ihr
// Projekt Klarheit und Richtung benötigt.
//
// Die Vielfalt der Perspektiven wirkt **wie die Weisheit eines erfahrenen Teams** und bietet eine breite Palette von Lösungen und Sichtweisen.
//
// #### Überlegungen
// Das Tool **verbraucht mehr Tokens** als ein regulärer Chat, was ein weiterer Grund ist, es frühzeitig zu verwenden, wenn
// der Chatverlauf kurz ist und die Rendite höher ist.
// `,
//   },
] as const;


const beamExplainerSx: SxProps = {
  // allows the content to be scrolled (all browsers)
  overflowY: 'auto',
  // actually make sure this scrolls & fills
  height: '100%',

  // style
  padding: 3, // { xs: 3, md: 3 },
  animation: `${animationEnterScaleUp} 0.2s cubic-bezier(.17,.84,.44,1)`,

  // layout
  display: 'grid',
};


export function BeamExplainer(props: {
  onWizardComplete: () => any,
}) {

  return (
    <Box
      // variant={grayUI ? 'solid' : 'soft'}
      // invertedColors={grayUI ? true : undefined}
      sx={beamExplainerSx}
    >

      <ExplainerCarousel
        explainerId='beam-onboard'
        steps={beamSteps}
        // footer={
        //   <Typography level='body-xs' sx={{ textAlign: 'center', maxWidth: '400px', mx: 'auto' }}>
        //     {/*Unlock beaming, combine AI wisdom, achieve clarity.*/}
        //     {/*Discover, Design and Dream.*/}
        //     {/*The journey from exploration to refinement is iterative.*/}
        //     {/*Each cycle sharpens your ideas, bringing you closer to innovation.*/}
        //   </Typography>
        // }
        onFinished={props.onWizardComplete}
      />

    </Box>

  );
}