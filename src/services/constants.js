// Mode values
export const CONFIG_MODE = 'config';
export const VIEWER_MODE = 'viewer';
export const DASHBOARD_MODE = 'dashboard';
// Anchor values
export const COMPONENT_ANCHOR = 'component';
export const PANEL_ANCHOR = 'panel';
export const VIDEO_ANCHOR = 'video_overlay';
// Platform values
export const WEB_PLATFORM = 'web';
export const MOBILE_PLATFORM = 'mobile';
// Load states
export const LOAD_DONE = 'done';
export const LOAD_ERROR = 'error';
export const LOAD_PENDING = 'pending';
// Save state
export const SAVE_DONE = 'done';
export const SAVE_ERROR = 'error';
export const SAVE_PENDING = 'pending';
// Config view steps
export const ACTIVE_STEP_1 = 0;
export const ACTIVE_STEP_2 = 1;
export const ACTIVE_STEP_3 = 2;
export const ACTIVE_STEP_4 = 3;

// View values
export const TABS_HEIGHT = 70;
export const CONFIG_PREVIEW_HEIGHT = 415;

// Visibility Toggle Button Position
export const VISIBILITY_BUTTON_POSITIONS = [
  { value: 'BottomRight', label: 'Bottom Right' },
  { value: 'BottomLeft', label: 'Bottom Left' },
  { value: 'TopLeft', label: 'Top Left' },
  { value: 'TopRight', label: 'Top Right' },
];

// Strip tags
export const STRIP_TAGS = [
  'a',
  'script',
  'form',
  'input',
  'meta',
  'link',
  'base',
  'body',
  'img,'
];

export const PANEL_FADE_OUT_DELAY = 3000;
export const MAX_TABS = 30;

export const SHOWDOWN_CONFIG = {
  tables: true,
  simplifiedAutoLink: false,
  strikethrough: true,
  tasklists: true,
  parseImgDimensions: false,
  smoothLivePreview: true,
  openLinksInNewWindow: true,
  emoji: true,
  simpleLineBreaks: true,
};

export const DEFAULT_BODY_TEXT = `## Features:
* Multiple tabs in one panel
* Easy editing and previewing
* Customize your text color and background color
* Enable as a panel or video overlay

**Steps to success:**
- Install the extension
- Enable is as _Panel_ or _Video Overlay_
- Enter your text
- Give your viewers all the information they need`;
