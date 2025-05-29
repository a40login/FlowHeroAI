import * as React from 'react';

import { Button, Card, CardContent, Grid, Typography } from '@mui/joy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LaunchIcon from '@mui/icons-material/Launch';

import { Link } from '~/common/components/Link';


const flowHeroEvolutionSurveyUrl = 'https://y2rjg0zillz.typeform.com/to/ZSADpr5u?utm_source=gh-2&utm_medium=news&utm_campaign=ea2'; // TODO: Update survey URL

export const flowHeroEvolutionNewsCallout =
  <Card variant='solid' invertedColors>
    <CardContent sx={{ gap: 2 }}>
      <Typography level='title-lg'>
        FlowHero Evolution - In Entwicklung
      </Typography>
      <Typography level='body-sm'>
        Wir entwickeln die nächste Version von FlowHero, zugeschnitten auf Ihre Bedürfnisse als Business-Assistent. Neue Funktionen, bessere Performance, verbesserte KI-Interaktionen. Gestalten Sie mit uns die Zukunft.
      </Typography>
      <Grid container spacing={1}>
        <Grid xs={12} sm={7}>
          <Button
            fullWidth variant='soft' color='primary' endDecorator={<LaunchIcon />}
            component={Link} href={flowHeroEvolutionSurveyUrl} noLinkStyle target='_blank'
          >
            Bewerben Sie sich für Early Access
          </Button>
        </Grid>
        <Grid xs={12} sm={5} sx={{ display: 'flex', flexAlign: 'center', justifyContent: 'center' }}>
          <Button
            fullWidth variant='outlined' color='primary' startDecorator={<AccessTimeIcon />}
            disabled
          >
            Kommt Herbst 2024
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>;