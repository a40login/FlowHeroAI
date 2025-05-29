import * as React from 'react';

import { FormControl, ListDivider, Switch } from '@mui/joy';
import CodeIcon from '@mui/icons-material/Code';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import type { DModelDomainId } from '~/common/stores/llms/model.domains.types';
import { FormLabelStart } from '~/common/components/forms/FormLabelStart';
import { FormSelectControl, FormSelectOption } from '~/common/components/forms/FormSelectControl';
import { useLLMSelect } from '~/common/components/forms/useLLMSelect';
import { useLabsDevMode } from '~/common/stores/store-ux-labs';
import { useModelDomain } from '~/common/stores/llms/hooks/useModelDomain';

import { useChatAutoAI } from '../chat/store-app-chat';


const _keepThinkingBlocksOptions: FormSelectOption<'all' | 'last-only'>[] = [
  {
    value: 'all',
    label: 'Alle Blöcke',
    description: 'Alle Blöcke behalten',
  },
  {
    value: 'last-only',
    label: 'Nur letzte Nachricht',
    description: 'Nur den letzten Block behalten',
  },
] as const;


function FormControlDomainModel(props: {
  domainId: DModelDomainId,
  title: React.ReactNode,
  description?: React.ReactNode,
  tooltip?: React.ReactNode,
}) {

  // external state
  const { domainModelId: fastModelId, assignDomainModelId: setFastModelId } = useModelDomain(props.domainId);
  const [_llm, llmComponent] = useLLMSelect(fastModelId, setFastModelId, { label: '', autoRefreshDomain: props.domainId });

  return (
    <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
      <FormLabelStart
        title={props.title}
        description={props.description}
        tooltip={props.tooltip}
      />
      {llmComponent}
    </FormControl>
  );
}


export function AppChatSettingsAI() {

  const {
    autoSuggestAttachmentPrompts, setAutoSuggestAttachmentPrompts,
    autoSuggestDiagrams, setAutoSuggestDiagrams,
    autoSuggestHTMLUI, setAutoSuggestHTMLUI,
    // autoSuggestQuestions, setAutoSuggestQuestions,
    autoTitleChat, setAutoTitleChat,
    chatKeepLastThinkingOnly, setChatKeepLastThinkingOnly,
  } = useChatAutoAI();

  const labsDevMode = useLabsDevMode();

  const showModelIcons = false; // useUIComplexityMode() === 'extra';

  // callbacks

  const handleAutoSetChatTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setAutoTitleChat(event.target.checked);

  const handleAutoSuggestAttachmentPromptsChange = (event: React.ChangeEvent<HTMLInputElement>) => setAutoSuggestAttachmentPrompts(event.target.checked);

  const handleAutoSuggestDiagramsChange = (event: React.ChangeEvent<HTMLInputElement>) => setAutoSuggestDiagrams(event.target.checked);

  const handleAutoSuggestHTMLUIChange = (event: React.ChangeEvent<HTMLInputElement>) => setAutoSuggestHTMLUI(event.target.checked);

  // const handleAutoSuggestQuestionsChange = (event: React.ChangeEvent<HTMLInputElement>) => setAutoSuggestQuestions(event.target.checked);

  return <>

    <FormControlDomainModel
      domainId='codeApply'
      title={!showModelIcons ? 'Code-Modell' : <><CodeIcon color='primary' sx={{ fontSize: 'lg', mr: 0.5, mb: 0.25 }} />Code-Modell</>}
      description='Code-Aufgaben'
      tooltip={<>
        Intelligentes <b>Code-Bearbeitungs</b>-Modell (muss Tool Calls unterstützen) mit großartigen Programmierfähigkeiten und nicht zu langsam. Verwendet für:
        <ul>
          <li>Diagramm-Generierung</li>
          <li>HTML UI-Generierung</li>
          <li>Vorwärtskompatibilität</li>
        </ul>
        Idealerweise ein Sonnet 3.5-Klasse Modell wählen.
      </>}
    />

    <FormControlDomainModel
      domainId='fastUtil'
      title={!showModelIcons ? 'Utility-Modell' : <><EditRoundedIcon color='primary' sx={{ fontSize: 'lg', mr: 0.5, mb: 0.25 }} />Utility-Modell</>}
      description='Schnelle, verschiedene Aufgaben'
      tooltip={<>
        Leichtgewichtiges Modell (muss Tool Calls unterstützen) für &quot;schnelle&quot;, kostengünstige Operationen, wie:
        <ul>
          <li>Chat-Titel-Generierung</li>
          <li>Anhang-Prompts</li>
          <li>Zeichen-Prompts</li>
          <li>Und mehr</li>
        </ul>
        Für Chat-Nachrichten und ähnliche hochwertige Inhalte wird stattdessen das Chat-Modell verwendet.
      </>}
    />

    {labsDevMode && (
      <FormControlDomainModel
        domainId='primaryChat'
        title={<><EngineeringIcon color='warning' sx={{ fontSize: 'lg', mr: 0.5, mb: 0.25 }} />Zuletzt verwendetes Modell</>}
        description='Chat-Fallback-Modell'
        tooltip='The last used chat model, used as default for new conversations. This is a develoment setting used to test out auto-detection of the most fitting initial chat model.'
      />
    )}

    <FormSelectControl
      title='Denkblöcke'
      tooltip='Steuert, wie KI-Denk-/Begründungsblöcke in Ihrem Chat-Verlauf gespeichert werden. Das Behalten nur in der letzten Nachricht (Standard) reduziert die Unordnung.'
      options={_keepThinkingBlocksOptions}
      value={chatKeepLastThinkingOnly ? 'last-only' : 'all'}
      onChange={(value) => setChatKeepLastThinkingOnly(value === 'last-only')}
      selectSx={{ minWidth: 140 }}
    />

    <ListDivider inset='gutter'>Automatische KI-Funktionen</ListDivider>

    <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
      <FormLabelStart title='Chat Auto-Titel'
                      description={autoTitleChat ? 'Automatisch' : 'Nur manuell'}
                      tooltip='[Utility-Modell]  Generiert automatisch relevante Titel für neue Chat-Unterhaltungen.'
                      tooltipWarning={!autoTitleChat} />
      <Switch checked={autoTitleChat} onChange={handleAutoSetChatTitleChange}
              endDecorator={autoTitleChat ? 'An' : 'Aus'}
              slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
    </FormControl>

    <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
      <FormLabelStart title='Anhang-Prompts'
                      description={autoSuggestAttachmentPrompts ? 'Aktionen vorschlagen' : 'Aus'}
                      tooltip={!autoSuggestAttachmentPrompts ? undefined : '[Utility-Modell]  Schlägt Aktionen/Prompts vor, wenn Anhänge zur Unterhaltung hinzugefügt werden.'} />
      <Switch checked={autoSuggestAttachmentPrompts} onChange={handleAutoSuggestAttachmentPromptsChange}
              endDecorator={autoSuggestAttachmentPrompts ? 'An' : 'Aus'}
              slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
    </FormControl>


    <ListDivider inset='gutter'>Nachrichten automatisch erweitern</ListDivider>

    <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
      <FormLabelStart title='Generative Diagramme'
                      description={autoSuggestDiagrams ? 'Diagramme hinzufügen' : 'Aus'}
                      tooltip={!autoSuggestDiagrams ? undefined : '[Coding model]  Erstellt automatisch visuelle Diagramme und Flussdiagramme, wenn die KI erkennt, dass eine Antwort mit einer visuellen Darstellung klarer wäre.'} />
      <Switch checked={autoSuggestDiagrams} onChange={handleAutoSuggestDiagramsChange}
              endDecorator={autoSuggestDiagrams ? 'An' : 'Aus'}
              slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
    </FormControl>

    <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
      <FormLabelStart
        title='Generative UIs'
        description={autoSuggestHTMLUI ? 'HTML hinzufügen' : 'Aus'}
        tooltipWarning={autoSuggestHTMLUI}
        tooltip={<>
          [Coding model] Erstellt interaktive UI-Komponenten in Chat-Antworten, wenn angemessen.
          <hr />
          SICHERHEITSWARNUNG: DIES SCHALTET DIE JS/HTML-CODE-AUSFÜHRUNG INNERHALB VON CHAT-NACHRICHTEN EIN
          <hr />
          ALPHA-QUALITÄT NUR ZUM TESTEN. Verwendung auf eigenes Risiko.
        </>}
      />
      <Switch checked={autoSuggestHTMLUI} onChange={handleAutoSuggestHTMLUIChange}
              endDecorator={autoSuggestHTMLUI ? <div>An{' '}<WarningRoundedIcon sx={{ cursor: 'pointer', color: 'red' }} /></div> : 'Aus'}
              slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
    </FormControl>

    {/*<FormControl disabled orientation='horizontal' sx={{ justifyContent: 'space-between' }}>*/}
    {/*  <FormLabelStart title='Auto Questions'*/}
    {/*                  description={autoSuggestQuestions ? 'LLM Questions' : 'No'}*/}
    {/*                  tooltip={<>Vote <Link href='https://github.com/enricoros/big-agi/issues/228' target='_blank'>#228</Link></>} />*/}
    {/*  <Switch checked={autoSuggestQuestions} onChange={handleAutoSuggestQuestionsChange}*/}
    {/*          endDecorator={autoSuggestQuestions ? 'On' : 'Off'}*/}
    {/*          slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />*/}
    {/*</FormControl>*/}

  </>;
}
