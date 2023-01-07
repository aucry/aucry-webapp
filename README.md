

<p align="center">
    <a href="https://aucry.com" title="aucry.com">
        <img src="https://raw.githubusercontent.com/aucry/aucry-webapp/main/public/static/images/logo/aucry.svg" alt="Aucry Logo" height="64"/> 
    </a>
</p>

<div align="center">

![version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

</div>

<h2>Aucry Webapp</h2>

This repository holds the source code for the Aucry webapp, as part of our commitment to be open source.

The webapp is based on the excellent Tokyo Black Admin Dashboard by BloomUI (https://github.com/bloomui/tokyo-free-black-react-admin-dashboard)

**Note: Work is currently in progress to port the Aucry Webapp from the premium version of Tokyo Black Admin to this repository - hang tight - at present the repo is little more than a clone of the admin dashboard!**

---

<h2>
    Running Locally
</h2>
<ol>
    <li>Make sure you have the latest stable versions for Node.js and NPM installed</li>
    <li>Clone repository: <code>git clone https://github.com/aucry/aucry-webapp.git</code></li>
    <li>Install dependencies: Run <code>npm install</code> inside the project folder</li>
    <li>Start dev server: After the install finishes, run <code>npm run start</code>.</li>
    <li>First, the command will boot a hardhat node and deploy the contracts onto the local network.</li>
    <li>The command will then auto-reconfigure config.ts with the addresses of the deployed contracts.</li>
    <li>A browser window will open on http://localhost:3000 where you can use the local webapp</li>
</ol>

---

The MIT License

Copyright © 2022-2023 Mark J. Newby t/a Aucry.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
