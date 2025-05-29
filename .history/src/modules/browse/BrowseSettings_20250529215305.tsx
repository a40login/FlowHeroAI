import * as React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Checkbox, FormControl, FormHelperText, FormLabel, Option, Select, Typography } from '@mui/joy';

import { AlreadySet } from '~/common/components/AlreadySet';
import { ExternalLink } from '~/common/components/ExternalLink';
import { FormInputKey } from '~/common/components/forms/FormInputKey';
import { FormLabelStart } from '~/common/components/forms/FormLabelStart';
import { platformAwareKeystrokes } from '~/common/components/KeyStroke';

import { useBrowseCapability, useBrowseStore } from './store-module-browsing';


const _styleHelperText = {
  fontSize: 'xs',
} as const;


export function BrowseSettings() {

  // external state
  const { mayWork, isServerConfig, isClientValid, inComposer, inReact, inPersonas } = useBrowseCapability();
  const {
    wssEndpoint, setWssEndpoint,
    pageTransform, setPageTransform,
    setEnableComposerAttach, setEnableReactTool, setEnablePersonaTool,
  } = useBrowseStore(useShallow(state => ({
    wssEndpoint: state.wssEndpoint,
    pageTransform: state.pageTransform,
    setPageTransform: state.setPageTransform,
    setWssEndpoint: state.setWssEndpoint,
    setEnableComposerAttach: state.setEnableComposerAttach,
    setEnableReactTool: state.setEnableReactTool,
    setEnablePersonaTool: state.setEnablePersonaTool,
  })));

  const handlePageTransformChange = (_event: any, value: typeof pageTransform | null) => value && setPageTransform(value);


  return <>

    <Typography level='body-sm'>
      Ermöglicht das Herunterladen von Webseiten. <ExternalLink href='https://flow-hero.de/docs/config-feature-browse'>Mehr erfahren</ExternalLink>.<br />
      <b>Websuche</b> wird separat konfiguriert und erfordert einen Google API-Schlüssel.
      {/*Web Browser lets the AI visit and analyze web pages in real-time. <ExternalLink href='https://big-agi.com/docs/config-feature-browse'>Learn more about setup</ExternalLink>.*/}
    </Typography>

    <FormInputKey
      autoCompleteId='browse-wss' label='Puppeteer Wss' noKey
      value={wssEndpoint} onChange={setWssEndpoint}
      rightLabel={<AlreadySet required={!isServerConfig} />}
      required={!isServerConfig} isError={!isClientValid && !isServerConfig}
      placeholder='wss://...'
    />


    <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <FormLabelStart title='Seiten-Transformation' description='Inhalt bereinigen' />
      <Select
        variant='outlined'
        value={pageTransform}
        onChange={handlePageTransformChange}
        sx={{ minWidth: 120 }}
      >
        <Option value='none'>Keine</Option>
        <Option value='clean'>Bereinigen</Option>
        <Option value='markdown'>Markdown</Option>
      </Select>
    </FormControl>


    <FormControl disabled={!mayWork}>
      <Checkbox size='sm' label='Im Composer anhängen' checked={inComposer} onChange={(event) => setEnableComposerAttach(event.target.checked)} />
      <FormHelperText sx={_styleHelperText}>{platformAwareKeystrokes('Laden und anhängen beim Einfügen einer URL')}</FormHelperText>
    </FormControl>

    <FormControl disabled={!mayWork}>
      <Checkbox size='sm' label='ReAct' checked={inReact} onChange={(event) => setEnableReactTool(event.target.checked)} />
      <FormHelperText sx={_styleHelperText}>Aktiviert loadURL() in ReAct</FormHelperText>
    </FormControl>

    <FormControl disabled>
      <Checkbox size='sm' label='Personas Browsing-Tool' checked={false} onChange={(event) => setEnablePersonaTool(event.target.checked)} />
      <FormHelperText sx={_styleHelperText}>Demnächst verfügbar</FormHelperText>
      {/*<FormHelperText sx={_styleHelperText}>Enable loading URLs by Personas</FormHelperText>*/}
    </FormControl>

  </>;
}