module.exports = {
  title: `tedcode.me`,
  description: `TED의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://tedcode.me`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `gizrak/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-Y5HWFZ3NDS', // Google Analytics Tracking ID
  author: {
    name: `TED`,
    bio: {
      role: `개발자`,
      description: ['즐겁게 사는', '긍정적 에너지의', '대화를 좋아하는'],
      thumbnail: 'profile2.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/gizrak`,
      linkedIn: `https://www.linkedin.com/in/gizrak`,
      email: `doodyfree@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.03.08 ~',
        activity: '개발 블로그 오픈',
        links: {
          post: '/2022/2022-03-08-Jekyll에서-Gatsby-블로그로-변경',
          github: 'https://github.com/gizrak/zoomkoding-gatsby-blog',
          demo: 'https://tedcode.me',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '웹기반 바둑 플랫폼 개발',
        description:
          'HTML5 스펙을 공부하면서 canvas를 이용하여 웹에서만 동작할 수 있는 바둑게임 플랫폼을 만들어 보았습니다.',
        techStack: ['jquery', 'html5'],
        thumbnailUrl: 'baduk.png',
        links: {
          github: 'https://github.com/gizrak/baduk',
          demo: 'https://gizrak-baduk.herokuapp.com/',
        },
      },
    ],
  },
};
