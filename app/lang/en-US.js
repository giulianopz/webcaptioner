export default {
  common: {
    ok: 'Ok',
    cancel: 'Cancel',
    clear: 'Clear',
    search: 'Search...',
    close: 'Close',
    add: 'Add',
    remove: 'Remove',
    off: 'Off',
    on: 'On',
    update: 'Update',
    setup: 'Setup',
    setUpVerb: 'Set Up',
    showSetup: 'Show Setup',
    hideSetup: 'Hide Setup',
    loading: 'Loading',
    install: 'Install',
    next: 'Next',
    done: 'Done',
    dismiss: 'Dismiss',
  },
  app: {
    webCaptioner: 'Web Captioner',
    description:
      'Real-time captioning for your event, speech, classroom lecture, or church service.',
  },
  captioner: {
    volumeMeter: {
      tooLoud: 'Too loud',
      tooQuiet: 'Too quiet',
    },
    clearTranscript: {
      title: 'Clear transcript?',
      ok: 'Clear Transcript',
    },
    saveToFile: {
      title: 'Save to File',
      description: 'Save your current transcript to a file.',
      transcriptEmptyMessage: "You don't have a transcript to save right now.",
      textFile: 'Text File',
      text: 'Text',
      wordDocument: 'Word Document',
      word: 'Word',
    },
  },
  receiver: {
    splash: {
      captionsWillBeginShortly: 'Captions will begin shortly.',
      connected: 'Connected!',
      useThisCodeToConnect: 'Use this code to connect.',
    },
  },
  googleCast: {
    cast: 'Cast',
    connecting: 'Connecting',
    castingToReceiver: 'Casting to {receiverName}',
    castingFailed: 'Casting Failed',
    unableToCast: 'Unable to Cast',
    pleaseTryAgain: 'Please try again.',
  },
  navbar: {
    captioner: {
      startCaptioning: 'Start Captioning',
      stopCaptioning: 'Stop Captioning',
      listeningToMicrophone: 'Listening &middot; {microphoneName}',
      listening: 'Listening',
    },
    menu: {
      about: '@:settings.about.about',
      blog: 'Blog',
      helpCenter: 'Help Center',
      community: 'Community',
      donate: 'Donate',
      feedback: 'Feedback',
      newWindow: 'New Window',
      newWindowDescription: '@:settings.controls.showNewWindow',
      saveToFile: '@:captioner.saveToFile.title',
      settings: 'Settings',
      menu: 'Menu',
    },
    vmixNotConnected: 'vMix Not Connected',
  },
  settings: {
    settings: 'Settings',
    general: 'General',
    integrations: 'Integrations',
    other: 'Other',
    about: {
      about: 'About',
      learnMore: 'Learn More',
      whatsNew: "What's New",
      whatsNewInWebCaptioner: "What's New in @:app.webCaptioner",
      getStarted: 'Get Started',
    },
    experiments: {
      experiments: 'Experiments',
      description:
        'Be sure to help out and give me feedback about experiments! Email me at {email} or {messageMeOnFacebook}.',
      messageMeOnFacebook: 'message me on Facebook',
      addExperimentConfirmation:
        'Do you want to add the "{experimentName}" experiment?',
      addExperiment: 'Add Experiment',
      experimentName: 'Experiment Name',
      alreadyAdded:
        'You\'ve already added the "{alreadyAddedExperimentName}" experiment.',
      addedExperiments: 'Added Experiments',
    },
    appearance: {
      appearance: 'Appearance',
      preview: 'Preview',
      text: 'Text',
      textColor: 'Text Color',
      textColorInterim: 'Interim Text Color',
      useRegularTextColor: 'Use Regular Text Color',
      interimTextColorDescription:
        'During captioning, words that have just been recognized may change slightly while Web Captioner determines the context of the current phrase. Those words will be this color.',
      fontFamily: 'Font Family',
      textSize: 'Text Size',
      lineHeight: 'Line Height',
      letterSpacing: 'Letter Spacing',
      capitalization: 'Capitalization',
      uppercase: 'UPPERCASE',
      firstLetterOfEachWord: 'First Letter Of Each Word',
      properNouns: 'Proper nouns and the start of sentences',
      properNounsDescription:
        'Separate sentences are detected only when a puncuation mark like "period" or "question mark" is literally said.',
      alignment: 'Alignment',
      horizontalAlignment: 'Horizontal Alignment',
      verticalAlignment: 'Vertical Alignment',
      full: 'Full',
      left: 'Left',
      middle: 'Middle',
      right: 'Right',
      top: 'Top',
      bottom: 'Bottom',
      lowerThird: 'Lower Third',
      padding: 'Padding',
      background: 'Background',
      backgroundColor: 'Background Color',
      backgroundOpacity: 'Background Opacity',
      textShadow: 'Text Shadow',
      shadowColor: 'Shadow Color',
      opacity: 'Opacity',
      blur: 'Blur',
      xPosition: 'X Position',
      yPosition: 'Y Position',
    },
    censor: {
      censor: 'Censor',
      censorProfaneLanguage: 'Censor profane language.',
      usEnglishOnly: 'Currently available for US English only.',
      censorProfaneLanguageDescription: {
        text:
          "What's considered profane? {seeThisList} (note: profanity ahead!) If you need to censor additional words not included in this list, {useWordReplacements}.",
        seeThisList: 'See this list',
        useWordReplacements: 'use word replacements',
      },
      replaceCensoredWordsWith: 'Replace censored words with',
      nothing: 'nothing — just omit them',
      asterisks: 'asterisks',
    },
    controls: {
      controls: 'Controls',
      screenLayout: 'Screen Layout',
      default: 'Default',
      defaultDescription: 'Regular-sized controls',
      larger: 'Larger',
      largerDescription:
        'Larger controls and additional buttons for one-click saving and clearing the transcript',
      keyboardShortcuts: 'Shortcuts',
      then: 'then',
      ctrl: 'Ctrl',
      shift: 'Shift',
      toggleCaptioning: 'Toggle captioning on/off',
      toggleFullscreen: 'Toggle fullscreen mode on/off',
      showNewWindow: 'Show captions in a new window',
      openSettings: 'Open Settings',
      increaseTextSize: 'Increase text size',
      decreaseTextSize: 'Decrease text size',
      openSave: 'Open "@:captioner.saveToFile.title" dialog',
      clearTranscript: 'Clear transcript',
      listKeyboardShortcuts: 'List keyboard shortcuts',
    },
    language: {
      language: 'Language',
      interface: 'Web Captioner Interface Language',
      interfaceDescription:
        'Select a language for the Web Captioner interface (menus, messages, and settings pages).',
      wouldYouLikeYourLanguage:
        "Would you like your language here? {contactWebCaptionerOnFacebook} if you're interested in helping to translate Web Captioner. Thanks for all of your awesome help! {heartIcon}",
      contactWebCaptionerOnFacebook: 'Contact Web Captioner on Facebook',
      spoken: 'Spoken Language',
      spokenDescription: {
        text:
          'Web Captioner will recognize speech in the language you select. Learn more about {supportedLanguagesAndDialects}.',
        supportedLanguagesAndDialects: 'supported languages and dialects',
      },
      list: {
        'en-US': 'English (United States)',
      },
    },
    remoteDisplays: {
      remoteDisplays: 'Remote Displays',
    },
    wordReplacements: {
      wordReplacements: 'Word Replacements',
      description:
        'Replace or hide specific words or phrases during captioning.',
      wordOrPhraseToReplace: 'Word or Phrase to Replace',
      wordOrPhraseToReplaceSentenceCase: 'Word or phrase to replace',
      wordOrPhraseToReplaceDescription:
        'Separate multiple words or phrases with commas. Not case sensitive.',
      replaceWith: 'Replace With',
      replaceWithSentenceCase: 'Replace with',
      addAnother: 'Add Another',
    },
    vmix: {
      vmix: 'vMix',
      description: {
        text:
          "{vMix} is a popular software video mixer and switcher. You can send text directly to vMix and display it in a title input. You can then use vMix's font and color controls to style captioned text. {visitTheHelpCenter} to learn more.",
        visitTheHelpCenter: 'Visit the Help Center',
      },
      connectedToVmix: 'Connected to vMix!',
      connected: 'Connected',
      captionsWillAppear:
        '{startCaptioning} and your captions will now appear in vMix.',
      startCaptioning: 'Start captioning',
      connectToVmix: 'Connect to vMix',
      sendTestMessage: 'Send Test Message',
      sent: 'Sent!',
      step1: 'Step 1',
      step2: 'Step 2',
      step3: 'Step 3',
      completeStep1First: 'Complete step 1 first',
      completeStep2First: 'Complete step 2 first',
      completeSteps1And2First: 'Complete steps 1 and 2 first',
      installChromeExtension: 'Install Chrome Extension',
      installChromeExtensionDescription:
        'The Web Captioner Connector extension for Google Chrome lets Web Captioner connect to vMix.',
      addToChrome: 'Add to Chrome',
      extensionInstalled: 'Extension Installed',
      extensionNotInstalled: 'Extension not installed.',
      vmixWebController: 'vMix Web Controller',
      webControllerAddress: 'vMix Web Controller Address',
      webController: 'Web Controller',
      enableVmixWebController: 'Enable the vMix Web Controller',
      enableVmixWebControllerInstructions:
        'In vMix, go to {settingMenu}. Check the box to enable the {webController}. Specify a port number or accept the default.',
      enableVmixWebControllerSettingMenu: 'Settings > Web Controller',
      provideAddress: 'Provide the address that appears in vMix:',
      example: 'Example:',
      cannotConnect:
        'Cannot connect to vMix at "{webControllerAddress}". Make sure Web Controller is enabled in vMix and that you\'ve copied over the website address correctly. It should look something like this: http://192.168.1.1:8080',
      import: 'Import',
      importTitleTemplate: 'Import Title Template',
      webCaptionerTitleTemplate: 'Web Captioner Title Template',
      importTitleTemplateLonger:
        'Import the Web Captioner Title Template into vMix',
      importTitleTemplateInstructions: {
        i0: 'Download the {webCaptionerTitleTemplate} for vMix.',
        i1: 'In vMix, go to {addInputSetting}.',
        i2:
          'In the {inputSelect} window, click {browse} in the upper right and open the Web Captioner title template you downloaded.',
        i3: 'The title will appear in the {recent} tab. Double-click it.',
        i4:
          'In the Title Editor that appears, optionally customize font and text size. Close it when you are finished.',
      },
      cantFindTemplate:
        "Web Captioner can connect to vMix, but it can't find the Web Captioner title template in an input.",
      testAndFinishSetup: 'Test and Finish Setup',
    },
    webhooks: {
      webhooks: 'Webhooks',
    },
    zoom: {
      zoom: 'Zoom',
    },
    exportRestore: {
      exportRestoreSettings: 'Export and Restore Settings',
      restore: 'Restore',
      restoreDescription:
        'Restore settings (appearance, censor settings, word replacements, vMix settings, etc.) from a settings file you previously exported.',
      restoreSettingsQuestion: 'Restore settings from this file?',
      somethingWrongWithFile: "It looks like something's wrong with that file.",
      restoredSettings: 'Settings Restored',
      reset: 'Reset',
      resetDescription: 'Reset all of your settings.',
      resetSettingsQuestion: 'Reset all your settings?',
      settingsWillBeLost: 'All of your current settings will be lost.',
      settingsReset: 'Settings Reset',
      export: 'Export',
      exportDescription: 'Your settings will be saved locally as a JSON file.',
    },
  },
  incompatibleBrowser: {
    incompatibleBrowser: 'Incompatible Browser',
    message: {
      i0:
        'Sorry, but currently Web Captioner only works in Google Chrome on Windows, Mac OS and Chrome OS. This is because Web Captioner {reliesOnTechnologyCalledWebSpeechAPI} that is only supported by Google Chrome at the moment and no other browsers.',
      i1:
        "You can still look around and play with settings, but in order to start captioning, you'll have to {switchToGoogleChrome}.",
      i2:
        'If compatibility with browsers other than Chrome is important to you, {castAVoteHere}.',
      switchToGoogleChrome: 'switch to Google Chrome',
      castAVoteHere: 'cast a vote here',
      reliesOnTechnologyCalledWebSpeechAPI:
        'relies on a technology called the Web Speech API',
    },
    whyJustChrome: 'Why just Chrome?',
    lookAroundAnyway: 'Look Around Anyway',
  },
};
