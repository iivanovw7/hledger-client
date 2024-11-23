import { compose } from "ramda";

import { withDesktopOverlay } from "./with-desktop-overlay";
import { withInitialState } from "./with-initial-state";
import { withProgressBar } from "./with-progress-bar";
import { withTheme } from "./with-theme";
import { withWaitScreen } from "./with-wait-screen";

export const withProviders = compose(withTheme, withWaitScreen, withProgressBar, withInitialState, withDesktopOverlay);
