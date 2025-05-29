import * as React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Checkbox, FormControl, FormHelperText, FormLabel, Typography } from '@mui/joy';

import { AlreadySet } from '~/common/components/AlreadySet';
import { ExternalLink } from '~/common/components/ExternalLink';
import { FormInputKey } from '~/common/components/forms/FormInputKey';
import { FormLabelStart } from '~/common/components/forms/FormLabelStart';
import { platformAwareKeystrokes } from '~/common/components/KeyStroke';

import { useGoogleSearchCapability, useGoogleSearchStore } from './store-module-google';


const _styleHelperText = {
  fontSize: 'xs',
} as const;


export function GoogleSearchSettings() {

  // external state
  const { mayWork, isServerConfig, isClientConfig, inComposer, inReact, inPersonas } = useGoogleSearchCapability();
  const {
    apiKey, setApiKey,
    cseId, setCseId,
    setEnableComposerAttach, setEnableReactTool, setEnablePersonaTool,
  } = useGoogleSearchStore(useShallow(state => ({
    apiKey: state.apiKey,
    setApiKey: state.setApiKey,
    cseId: state.cseId,
    setCseId: state.setCseId,
    setEnableComposerAttach: state.setEnableComposerAttach,
    setEnableReactTool: state.setEnableReactTool,
    setEnablePersonaTool: state.setEnablePersonaTool,
  })));


  return <>

    <Typography level='body-sm'>
      Ermöglicht die Websuche über Google Custom Search. <ExternalLink href='https://flow-hero.de/docs/config-google-search'>Mehr erfahren</ExternalLink>. {/* Übersetzt und Link angepasst */}
    </Typography>

    {!isServerConfig && <FormInputKey
      autoCompleteId='google-api-key' label='Google API-Schlüssel' // Übersetzt Label
      rightLabel={<AlreadySet required={!isServerConfig} />}
      value={apiKey} onChange={setApiKey}
      required={!isServerConfig} isError={!isClientConfig && !isServerConfig}
    />}

    {!isServerConfig && <FormInputKey
      autoCompleteId='google-cse-id' label='Google Custom Search Engine ID' // Übersetzt Label
      rightLabel={<AlreadySet required={!isServerConfig} />}
      value={cseId} onChange={setCseId}
      required={!isServerConfig} isError={!isClientConfig && !isServerConfig}
    />}


    <FormControl disabled={!mayWork}>
      <Checkbox size='sm' label='Im Composer anhängen' checked={inComposer} onChange={(event) => setEnableComposerAttach(event.target.checked)} /> {/* Übersetzt Label */}
      <FormHelperText sx={_styleHelperText}>{platformAwareKeystrokes('Laden und anhängen beim Einfügen einer Suchanfrage')}</FormHelperText> {/* Übersetzt */}
    </FormControl>

    <FormControl disabled={!mayWork}>
      <Checkbox size='sm' label='ReAct' checked={inReact} onChange={(event) => setEnableReactTool(event.target.checked)} />
      <FormHelperText sx={_styleHelperText}>Aktiviert google() in ReAct</FormHelperText> {/* Übersetzt */}
    </FormControl>

    <FormControl disabled={!mayWork}>
      <Checkbox size='sm' label='Personas Such-Tool' checked={inPersonas} onChange={(event) => setEnablePersonaTool(event.target.checked)} /> {/* Übersetzt Label */}
      <FormHelperText sx={_styleHelperText}>Ermöglicht Personas die Websuche</FormHelperText> {/* Übersetzt */}
    </FormControl>

  </>;
}
