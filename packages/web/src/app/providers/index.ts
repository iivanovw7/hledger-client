import { compose } from "ramda";

import { withDesktopOverlay } from "./with-desktop-overlay";
import { withInitialState } from "./with-initial-state";
import { withTheme } from "./with-theme";
import { withWaitScreen } from "./with-wait-screen";

export const withProviders = compose(withTheme, withWaitScreen, withInitialState, withDesktopOverlay);
