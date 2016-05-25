'use strict';

var router = require('express').Router(),
    cache = require('express-redis-cache')({
        host: "cache", 
        port: "6379",
        auth_pass: ""
    }),
    <%= camelName %> = new (require('./<%= camelName %>.controller'));

router.route('/<%= kebabName %>')
    /*
    * @api {GET} /<%= camelName %> Request all <%= camelName %>
    * @apiName <%= camelName %>
    * @apiGroup <%= camelName %>
    * @apiSuccess {Array} All <%= camelName %> in service
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     [{_id: '', name: ''}]
    *
    */
    .get(cache.route(5000), <%= camelName %>.find<%= camelName %>)
    /*
    * @api {POST} /<%= camelName %> Create <%= camelName %>
    * @apiName Create<%= camelName %>
    * @apiGroup <%= camelName %>
    * @apiSuccess {Array} Created <%= camelName %>
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {_id: '', name: ''}
    *
    */
    .post(<%= camelName %>.create<%= camelName %>);

router.route('/<%= kebabName %>/:ID')
    /*
    * @api {GET} /<%= camelName %>/:ID Request <%= camelName %> Infomation
    * @apiName <%= camelName %>
    * @apiGroup <%= camelName %>
    * @apiSuccess {Array} Requested <%= camelName %>
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {_id: '', name: ''}
    *
    */
    .get(cache.route(5000), <%= camelName %>.findOne<%= camelName %>)
    /*
    * @api {PUT} /<%= camelName %>/:ID Update <%= camelName %>
    * @apiName UpdateAccount
    * @apiGroup Accounts
    * @apiSuccess {Array} Updated <%= camelName %>
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {_id: '', name: ''}
    *
    */
    .put(<%= camelName %>.update<%= camelName %>)
    /*
    * @api {DELETE} /<%= camelName %>/:ID Remove <%= camelName %>
    * @apiName Remove<%= camelName %>
    * @apiGroup <%= camelName %>
    * @apiSuccess {Array} Removed <%= camelName %>
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {_id: '', name: ''}
    *
    */
    .delete(<%= camelName %>.remove<%= camelName %>);


module.exports = router;