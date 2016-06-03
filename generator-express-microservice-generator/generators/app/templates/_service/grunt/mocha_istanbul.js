'use strict';


module.exports = {
    coverage: {
        src: ['./routes'],
        options: {
            mask: '**/*.spec.js',
            coverageFolder: 'coverage',
            timeout: 5000,
            mochaOptions: ['--ui', 'tdd']
        }
    },
    // coverageSpecial: {
    //     src: ['testSpecial/*/*.js', 'testUnique/*/*.js'], // specifying file patterns works as well
    //     options: {
    //         coverageFolder: 'coverageSpecial',
    //         mask: '*.spec.js'
    //     }
    // },
    // coveralls: {
    //     src: ['./'], // multiple folders also works
    //     options: {
    //         coverage: true,
    //         check: {
    //             lines: 75,
    //             statements: 75
    //         },
    //         root: './', // define where the cover task should consider the root of libraries that are covered by tests
    //         reportFormats: ['lcovonly']
    //     }
    // }
};
