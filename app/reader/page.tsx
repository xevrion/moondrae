"use client";

import { ReaderShell } from "./ReaderShell";
import { ReaderViewport } from "./ReaderViewport";
import { ReaderControls } from "./ReaderControls";

export default function Reader() {
  return (
    <ReaderShell>
      <ReaderViewport />
      <ReaderControls />
    </ReaderShell>
  );
}
