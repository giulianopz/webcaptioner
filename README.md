<p align="center">
  <img src="./app/static/og-logo.png" alt="Web Captioner" width="300">
<br>
</p>

<h3 align="center">Web Captioner</h3>

<p align="center">A speech-to-text app by <a href="https://curtgrimes.com">Curt Grimes</a>.</p>

# Web Captioner

Web Captioner is a speech-to-text web service using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to transcribe microphone input in real time.

This is a stripped-down version of the original web service created by [Curt Grimes](https://curtgrimes.com/) who stopped maintaining Web Captioner on October 31, 2023, generously donating its source code to the community.
    
I resumed this app to offer its most valuable feature: a simple interface to the Web Speech API of Google Chrome for translating speech to text for free, optionally saving the transcript to a file.

This single feature is essential for many people, especially those who are deaf or hard of hearing because they have no other way to access precious contents on the web unless paying some expensive CART or Speech-to-Text services.
    
Any other features is temporarily disabled and I have no plans to restore them.

If you find Web Captioner useful, please find the time to say 'thank you' to its [author](mailto:contact@curtgrimes.com).

## Running the project

The bulk of the Web Captioner project (which was previously available at webcaptioner.com/captioner) is a [Vue 2](https://v2.vuejs.org/) / [Nuxt (version 2)](https://v2.nuxt.com/) app located under the `./app` folder. 

### Prerequisites

1. **Node v20.9.0** - This runs successfully with Node v20.9.0 (If you have [nvm](https://github.com/nvm-sh/nvm) you can run `nvm install v20.9.0`).
1. **Python 2** - To build some dependencies you will need Python 2 available in your environment.

### Local development server

To run the Nuxt.js development server:

1. Clone this repository
1. Make sure you meet the [prerequisites above](#prerequisites)
1. `cd ./app`
1. Run `task install`
1. Run `task serve`
1. Load the website **in Google Chrome** at the path printed to the console.
1. You will need to update Chrome to treat your dev server as a secure origin in order for Chrome to allow you to grant the page the microphone permission:
   1. Type **chrome://flags/#unsafely-treat-insecure-origin-as-secure** in the address bar
   1. Copy and paste the dev server origin (something that looks like http://192.168.1.200:8080) into the text box.
   1. Click "Enable" next to the text box.
   1. Save and relaunch the browser.

## Contributing

I'm not a JS person, so your help is more than welcome here. If you can, please consider contributing to the project hosted on [GitHub](https://github.com/giulianopz/webcaptioner).

## Development History

This project was open sourced on October 31, 2023.

Curt Grimes have chosen to provide the [full commit history](https://github.com/curtgrimes/webcaptioner/commits/) for those that are interested in seeing the course of Web Captioner's development over the years. Changes related to the static site part of the repo have been removed for simplicity.

Some relevant changes in the commit history:

1. [eee704fa](https://github.com/curtgrimes/webcaptioner/commit/eee704faf55b4a62c38776aba071c7ed5efa66b9) (Mar 18, 2017) - The first commit, which used [Google's Web Speech API Demonstration](https://www.google.com/chrome/demos/speech.html) page as a starting point.
1. [2f96e233](https://github.com/curtgrimes/webcaptioner/commit/2f96e233b3a701fda159d14b0c88bd83c8b2c2c4) (Jun 21, 2017) - Starting to add Bootstrap and some other UI improvements.
1. [fc566bd9](https://github.com/curtgrimes/webcaptioner/commit/fc566bd964403c45648c1c84c7b67ce1dbc22c72) (Jul 2, 2017) - Starting to add a blog and other pages on the static site part of the codebase (the static site has been removed from this source code release for simplicity).
1. [cad70d18](https://github.com/curtgrimes/webcaptioner/commit/cad70d18b5c93a15840c6397014dd1f999449604) (Dec 25, 2017) - Dockerize the app and set up some auto deployment to AWS.
1. [f7ab9f88](https://github.com/curtgrimes/webcaptioner/commit/f7ab9f8882f2f1ad979fdfa9897b68510128f084) (Mar 24, 2018) - Began adding (and learning 😉) Vue.
1. [4e0ca506](https://github.com/curtgrimes/webcaptioner/commit/4e0ca5060f1ca52e43401970fa0593d5aad3677b) (Apr 9, 2018) - Added the ability for settings to be saved to local storage.
1. [d7cd5926](https://github.com/curtgrimes/webcaptioner/commit/d7cd59266e5b0f0a4c4ac6bac32c282effeca473) (Apr 10, 2018) - Began working on Chromecast integration (got it working at [bfcab4a1](https://github.com/curtgrimes/webcaptioner/commit/bfcab4a19bff15adae3bd01893ff8d64cabfb244)).
1. [7056ef46](https://github.com/curtgrimes/webcaptioner/commit/7056ef464fa7a39a9050683fb41f73b59a99055c) (May 6, 2018) - Starting vMix integration implementation.
1. [51419d1c](https://github.com/curtgrimes/webcaptioner/commit/51419d1ce2ea6ab2cef669f338b1e0bef4226cde) (Jun 23, 2018) - Add start of an experiments section.
1. [0f04ba61](https://github.com/curtgrimes/webcaptioner/commit/0f04ba61f2ef6e01310b7cdc0834ae20af52e413) (Jun 27, 2018) - Add ability to change fonts.
1. [06fc0e98](https://github.com/curtgrimes/webcaptioner/commit/06fc0e9859e3d46db0cc2da32481423561abe68c) (Aug 31, 2018) - Begin using [Nuxt](https://v2.nuxt.com/).
1. [fea294d6](https://github.com/curtgrimes/webcaptioner/commit/fea294d6a98d1a3b0239a816c3e74bd2dcb10f98) (Sep 1, 2018) - Start adding the ability to call a webhook with caption data.
1. [8e43c17a](https://github.com/curtgrimes/webcaptioner/commit/8e43c17a8bfafaf8ac28b36214ca73d77afa66f9) (Sep 2, 2018) - Add ability to export and restore settings.
1. [83cdb0c0](https://github.com/curtgrimes/webcaptioner/commit/83cdb0c08786fe7ff28ef8553542e63b9c5729e8) and [d8f226cb](https://github.com/curtgrimes/webcaptioner/commit/d8f226cbc0541df420ebeeb684b3b1afea5b2f2c) (Sep 11, 2018) - Add the start of a typing mode which was never completely finished.
1. [fe756717](https://github.com/curtgrimes/webcaptioner/commit/fe7567172df783a838b07e996190bcc554621be0) (Sep 12, 2018) - Begin some work to make the Web Captioner interface support languages other than English.
1. [00b5b2e8](https://github.com/curtgrimes/webcaptioner/commit/00b5b2e84615a91c72c2f0d492b0b39af6c550dc) (Oct 1, 2018) - Initial work supporting the "share captions" feature/experiment.
1. [59855af0](https://github.com/curtgrimes/webcaptioner/commit/59855af09702e14c91158ad4664f2da0be0506bf) (Oct 29, 2018) - Add Dropbox integration.
1. [28ba1a76](https://github.com/curtgrimes/webcaptioner/commit/28ba1a7660ffa626321f0d87c5240d47407b7e89) (Nov 23, 2018) - Add a heuristic for attempting to "undo" censorship applied by Chrome's implementation of the Web Speech API.
1. [28db2c81](https://github.com/curtgrimes/webcaptioner/commit/28db2c81963485c9ef5077468899493dfaf176e8) (Apr 26, 2019) - Start to add Firebase for signing in and saving user settings.
1. [b6728eb9](https://github.com/curtgrimes/webcaptioner/commit/b6728eb995a5d8695f5977f6bf6036723065fc1e) (Apr 30, 2019) - Add ability to have vanity links in the "share captions" feature/experiment.
1. [ac6259eb](https://github.com/curtgrimes/webcaptioner/commit/ac6259eb059a39e016f3329f2be98e90e6186375) (Oct 26, 2019) - Add the start of some work for converting the output from the web speech API into a SRT file. Further improved in [1ceaed2c](https://github.com/curtgrimes/webcaptioner/commit/1ceaed2cc28590af6cfa021b2ad50af23fa87d6f) and [08b40b10](https://github.com/curtgrimes/webcaptioner/commit/08b40b10e9b6f177f1a5c5c563394b29da763267).
1. [cb69766b](https://github.com/curtgrimes/webcaptioner/commit/cb69766bfb1b1214834e9ff1c5a060edf2c0a041) (Jun 14, 2020) - Add start of Zoom integration.
1. [00844325](https://github.com/curtgrimes/webcaptioner/commit/008443258605ed47510f90a183956a31e34557bc) (Jun 23, 2020) - Add experiment where it speaks back what is captioned.
1. [703dd15a](https://github.com/curtgrimes/webcaptioner/commit/703dd15a403c59148c6fd1b0a5046f0ab4ba9496) (Sep 3, 2020) - Start of the work for the "channels" feature to support different integrations.
1. [b2bbc2a4](https://github.com/curtgrimes/webcaptioner/commit/b2bbc2a455d6575179827e6c2d08d30ed883c453) (Sep 3, 2020) - Start of YouTube integration.
1. [9a477bca](https://github.com/curtgrimes/webcaptioner/commit/9a477bca62a1c78c099ecc3059276f16e0a0a1c0) (Sep 7, 2020) - Start of OBS integration.
1. [90e43765](https://github.com/curtgrimes/webcaptioner/commit/90e43765cbfead79fe886adabd73099d85e5516f) (Sep 8, 2020) - Start of FAB Subtitler integration.
1. [fae5f2e4](https://github.com/curtgrimes/webcaptioner/commit/fae5f2e4e00c7d05982ee6f5d0c98217aff673f0) (Jun 3, 2021) - Add ability to scroll up during live transcription and without being snapped back to the bottom.

## Copyright and License

Code and documentation copyright 2017-present by Curt Grimes. Code released under the [MIT License](LICENSE.md).
