<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">


  <h3 align="center">Expense Categorizer</h3>

  <p align="center">
    This CLI script is designed to parse transactions (as .csv files) sourced from several credit cards and normalizes them into expenses with predefined categories so that the user can visualize them more effectively.
    <br />
    <a href="https://github.com/daynesh/budgeting-tools"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/daynesh/budgeting-tools">View Demo</a>
    ·
    <a href="https://github.com/daynesh/budgeting-tools/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/daynesh/budgeting-tools/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

After Mint shutdown, I've been at a loss for a decent tool that can categorize my expenses from all my credit cards and help me visualize how much I am spending, helping me identify opportunities to make my personal finances more effective.

This tool was created to do just that but is intended to be simple - a CLI that inputs transaction files from various credit card platforms and outputs a normalized list of expenses that conform to my predefined categories.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites
 
* npm
  ```sh
  $ npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   $ git clone https://github.com/daynesh/budgeting-tools.git
2. Change our working directory
   ```sh
   $ cd budgeting-tools
   ```
3. Install NPM packages
   ```sh
   $ npm install
   ```
4. Now build the project
   ```sh
   $ yarn build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

```sh
$ node bin/main.js -h
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/daynesh/budgeting-tools/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=daynesh/budgeting-tools" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/daynesh/budgeting-tools.svg?style=for-the-badge
[contributors-url]: https://github.com/daynesh/budgeting-tools/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/daynesh/budgeting-tools.svg?style=for-the-badge
[forks-url]: https://github.com/daynesh/budgeting-tools/network/members
[stars-shield]: https://img.shields.io/github/stars/daynesh/budgeting-tools.svg?style=for-the-badge
[stars-url]: https://github.com/daynesh/budgeting-tools/stargazers
[issues-shield]: https://img.shields.io/github/issues/daynesh/budgeting-tools.svg?style=for-the-badge
[issues-url]: https://github.com/daynesh/budgeting-tools/issues
[license-shield]: https://img.shields.io/github/license/daynesh/budgeting-tools.svg?style=for-the-badge
[license-url]: https://github.com/daynesh/budgeting-tools/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: images/screenshot.png