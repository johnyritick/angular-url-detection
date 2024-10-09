import { Component, OnInit } from '@angular/core';

interface Blog {
  url: string;
  previewImage: string;
  title: string;
  key: number;
  description: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];

  constructor() { }

  ngOnInit(): void {
    this.blogs = [
      {
        url: 'https://medium.com/@cybersecuritystephen/what-is-phishing-and-how-can-i-protect-myself-082eb300995b',
        previewImage: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*HR9qTv9zA6KaEHvMprI1aQ.jpeg',
        title: 'Phising Attack',
        key: 1,
        description: 'What is Phishing, and How Can I Protect Myself?'
      },
      {
        url: 'https://www.cloudflare.com/lp/2023-phishing-report/',
        previewImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiHl-ElVmvil3lxGS_dqUHyV_5gXFtA6FQ3A&s',
        title: 'Cloudflare. (2023). 2023 Phishing Threats Report',
        key: 2,
        description: 'Attack trends in multi-channel phishing, identity deception, malicious new domains, and more'
      },
      {
        url: 'https://www.cisco.com/c/en/us/products/security/email-security/what-is-phishing.html',
        previewImage: 'https://i0.wp.com/cyble.com/wp-content/uploads/2023/09/what-is-phishing.webp?fit=1024%2C512&ssl=1',
        title: 'What Is Phishing?',
        key: 3,
        description: 'How do phishing scams trick users'
      },
      {
        url: 'https://www.cloudflare.com/lp/2023-phishing-report/',
        previewImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiHl-ElVmvil3lxGS_dqUHyV_5gXFtA6FQ3A&s',
        title: 'Cloudflare. (2023). 2023 Phishing Threats Report',
        key: 4,
        description: 'Attack trends in multi-channel phishing, identity deception, malicious new domains, and more'
      },
      {
        url: 'https://www.cisco.com/c/en/us/products/security/email-security/what-is-phishing.html',
        previewImage: 'https://i0.wp.com/cyble.com/wp-content/uploads/2023/09/what-is-phishing.webp?fit=1024%2C512&ssl=1',
        title: 'What Is Phishing?',
        key: 5,
        description: 'How do phishing scams trick users'
      },
    ];
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

}
