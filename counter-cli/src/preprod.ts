// This file is part of midnightntwrk/example-counter.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// CRITICAL: Override Node.js undici's default 5-minute headersTimeout/bodyTimeout
// Shielded k=14 ZK proof generation takes 15+ minutes, so we need 60-minute timeouts
import { Agent, setGlobalDispatcher } from 'undici';
setGlobalDispatcher(new Agent({
    headersTimeout: 3_600_000,  // 60 minutes
    bodyTimeout: 3_600_000,     // 60 minutes
    connectTimeout: 60_000,     // 1 minute for connection
}));

import { createLogger } from './logger-utils.js';
import { run } from './cli.js';
import { PreprodConfig } from './config.js';

const config = new PreprodConfig();
const logger = await createLogger(config.logDir);
await run(config, logger);
