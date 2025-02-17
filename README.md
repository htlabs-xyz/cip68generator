<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/cardano2vn/cip68generator">
    <img src="https://github.com/user-attachments/assets/08a1249c-8498-4257-8e67-c84e46ce92f3" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">CIP68 Generator</h3>

  <p align="center">
   A Open source dynamic assets (Token/NFT) generator (CIP68) Project !
    <br />
    <a href="https://github.com/cardano2vn/cip68generator/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cip68.cardano2vn.io">View Demo</a>
    &middot;
    <a href="https://github.com/cardano2vn/cip68generator/issues/new?template=BUG_REPORT.yml">Report Bug</a>
    &middot;
    <a href="https://github.com/cardano2vn/cip68generator/issues/new?template=FEATURE_REQUEST.yml">Request Feature</a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://cip68.cardano2vn.io)

Assets on the Cardano platform compliant with CIP25 face many limitations in upgrading, modifying metadata, and registering with the Token Registry. Additionally, the Token Registry still depends on an entity that founded Cardano, making this process not entirely decentralized. CIP68 introduces a new classification method that allows third parties, such as wallets and decentralized exchanges, to easily identify token types.  

From building a CIP25-compliant native token creation platform, we observed a large number of users creating their own assets. However, the community still lacks many tools to help users create CIP68-compliant assets. We have successfully experimented with creating, managing metadata, and burning CIP68-compliant assets. Sharing this source code will be highly beneficial to an open-source community like Cardano.  
 
Our tool will attract two main user groups:  
- Non-tech users who want to create and manage CIP68-compliant native assets.  
- Companies and organizations that can leverage our open-source code to develop their own products.  

Of course, it may lack some specific features needed for your project since requirements can vary. Therefore, we will continue improving and adding more functionalities in the near future. You are also welcome to suggest changes by forking this repository and creating a pull request or opening an issue. Thanks to everyone who has contributed to expanding this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![NextJs][Next-img]][next-url]
* [![MeshJs][Mesh-img]][mesh-url]
* [![Aiken][Aiken-img]][aiken-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Prepare an instance of [IPFS](https://github.com/ipfs/kubo) and [Database](https://www.postgresql.org)
2. Clone the repo
   ```sh
   git clone https://github.com/cardano2vn/cip68generator.git
   ```
3. Install NPM packages
   ```sh
   npm install -f
   ```
4. Copy and edit env file according to your environment
   ```sh
   cp .env.example .env
   ```
5. Run project
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_For more details, please refer to the [Wiki Documentation](https://github.com/cardano2vn/cip68generator/wiki)_

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

### Top contributors:

<a href="https://github.com/cardano2vn/cip68generator/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=cardano2vn/cip68generator" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

[Cardano2vn Team](https://www.cardano2vn.io/about-us) - [Cardano2vn.io](https://www.cardano2vn.io) - [Telegram](https://t.me/cardano2vn)

Project Link: [https://github.com/cardano2vn/cip68generator](https://github.com/cardano2vn/cip68generator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Cip68-Datum Metadata Standard](https://cips.cardano.org/cip/CIP-68)
* [Catalyst Proposal](https://projectcatalyst.io/funds/12/cardano-use-cases-concept/open-source-dynamic-assets-tokennft-generator-cip68)
* [Meshjs Document](https://meshjs.dev)
* [Aiken Document](https://aiken-lang.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/cardano2vn/cip68generator.svg?style=for-the-badge
[contributors-url]: https://github.com/cardano2vn/cip68generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/cardano2vn/cip68generator.svg?style=for-the-badge
[forks-url]: https://github.com/cardano2vn/cip68generator/network/members
[stars-shield]: https://img.shields.io/github/stars/cardano2vn/cip68generator.svg?style=for-the-badge
[stars-url]: https://github.com/cardano2vn/cip68generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/cardano2vn/cip68generator.svg?style=for-the-badge
[issues-url]: https://github.com/cardano2vn/cip68generator/issues
[product-screenshot]: https://github.com/user-attachments/assets/67eb56a8-01cc-4c7f-a722-64fa5dde652b
[Next-img]: https://img.shields.io/badge/NextJs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Mesh-img]: https://img.shields.io/badge/MeshJs-000000?style=for-the-badge&logoColor=white
[Mesh-url]: https://meshjs.dev
[Aiken-img]: https://img.shields.io/badge/Aiken-000000?style=for-the-badge&logoColor=white
[Aiken-url]: https://aiken-lang.org/
