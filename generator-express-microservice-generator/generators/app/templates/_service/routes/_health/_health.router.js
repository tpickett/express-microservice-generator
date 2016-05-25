'use strict';

var router = require('express').Router(),
    health = new (require('./health.controller'));

router.route('/health')
    /*
    * @api {GET} /health Request Microservice Health Infomation
    * @apiName healthData
    * @apiGroup health
    * @apiSuccess {Object} Requested Vitals
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {}
    *
    */
    .get(health.vitals.express);


module.exports = router;