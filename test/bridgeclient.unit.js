'use strict';

var BridgeClient = require('../lib/bridgeclient');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var expect = require('chai').expect;
var KeyPair = require('../lib/keypair');
var utils = require('../lib/utils');

describe('BridgeClient', function() {

  describe('@constructor', function() {

    it('should create an instance with the given options', function() {
      var keypair = new KeyPair();
      var client = new BridgeClient(null, { keypair: keypair });
      expect(client._options.keypair).to.equal(keypair);
    });

    it('should create an instance with the given url', function() {
      var client = new BridgeClient('https://staging.api.storj.io');
      expect(client._options.baseURI).to.equal('https://staging.api.storj.io');
    });

    it('should create an instance without the new keyword', function() {
      var client = BridgeClient();
      expect(client).to.be.instanceOf(BridgeClient);
    });

  });

  describe('BridgeClient/Public', function() {

    describe('#getInfo', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.getInfo(function() {
          _request.restore();
          expect(_request.calledWith('GET', '/', {})).to.equal(true);
          done();
        });
      });

    });

    describe('#getContactList', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          []
        );
        var client = new BridgeClient();
        client.getContactList({}, function() {
          _request.restore();
          expect(_request.calledWith('GET', '/contacts', {})).to.equal(true);
          done();
        });

      });

    });

    describe('#getContactByNodeId', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.getContactByNodeId('nodeid', function() {
          _request.restore();
          expect(_request.calledWith(
            'GET',
            '/contacts/nodeid',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#createUser', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        var data = { email: 'gordon@storj.io', password: 'password' };
        client.createUser(data, function() {
          _request.restore();
          expect(_request.calledWithMatch(
            'POST',
            '/users',
            { email: data.email, password: utils.sha256(data.password) }
          )).to.equal(true);
          done();
        });
      });

    });

  });

  describe('BridgeClient/Keys', function() {

    describe('#getPublicKeys', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.getPublicKeys(function() {
          _request.restore();
          expect(_request.calledWith('GET', '/keys', {})).to.equal(true);
          done();
        });
      });

    });

    describe('#addPublicKey', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.addPublicKey('mypublickey', function() {
          _request.restore();
          expect(_request.calledWithMatch(
            'POST',
            '/keys',
            { key: 'mypublickey' }
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#destroyPublicKey', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.destroyPublicKey('mypublickey', function() {
          _request.restore();
          expect(_request.calledWith(
            'DELETE',
            '/keys/mypublickey',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

  });

  describe('BridgeClient/Buckets', function() {

    describe('#getBuckets', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.getBuckets(function() {
          _request.restore();
          expect(_request.calledWith(
            'GET',
            '/buckets',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#getBucketById', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.getBucketById('mybucket', function() {
          _request.restore();
          expect(_request.calledWith(
            'GET',
            '/buckets/mybucket',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#createBucket', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.createBucket({ name: 'My Bucket' }, function() {
          _request.restore();
          expect(_request.calledWithMatch(
            'POST',
            '/buckets',
            { name: 'My Bucket' }
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#destroyBucketById', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.destroyBucketById('mybucket', function() {
          _request.restore();
          expect(_request.calledWith(
            'DELETE',
            '/buckets/mybucket',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#updateBucketById', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.updateBucketById('mybucket', { name: 'Updated' }, function() {
          _request.restore();
          expect(_request.calledWith(
            'PATCH',
            '/buckets/mybucket',
            { name: 'Updated' }
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#listFilesInBucket', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.listFilesInBucket('mybucket', function() {
          _request.restore();
          expect(_request.calledWith(
            'GET',
            '/buckets/mybucket/files',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#createToken', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.createToken('mybucket', 'PUSH', function() {
          _request.restore();
          expect(_request.calledWithMatch(
            'POST',
            '/buckets/mybucket/tokens',
            { operation: 'PUSH' }
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#removeFileFromBucket', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.removeFileFromBucket('mybucket', 'myfile', function() {
          _request.restore();
          expect(_request.calledWith(
            'DELETE',
            '/buckets/mybucket/files/myfile',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#storeFileInBucket', function() {



    });

    describe('#getFilePointer', function() {

      it('should bubble request error', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, new Error('Failed'))
        });
        var client = new StubbedClient();
        client.getFilePointer('1', 'mytoken', 'myfile', function(err) {
          expect(err.message).to.equal('Failed');
          done();
        });
      });

      it('should pass error if bad request', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, null, {
            statusCode: 400
          }, { error: 'Bad request' })
        });
        var client = new StubbedClient();
        client.getFilePointer('1', 'mytoken', 'myfile', function(err) {
          expect(err.message).to.equal('Bad request');
          done();
        });
      });

      it('should pass body if bad request and no error', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, null, {
            statusCode: 400
          }, 'Bad request')
        });
        var client = new StubbedClient();
        client.getFilePointer('1', 'mytoken', 'myfile', function(err) {
          expect(err.message).to.equal('Bad request');
          done();
        });
      });

      it('should pass the result', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, null, {
            statusCode: 200
          }, { hello: 'world' })
        });
        var client = new StubbedClient();
        client.getFilePointer('1', 'mytoken', 'myfile', function(err, result) {
          expect(result.hello).to.equal('world');
          done();
        });
      });

    });

  });

  describe('BridgeClient/Frames', function() {

    describe('#createFileStagingFrame', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.createFileStagingFrame(function() {
          _request.restore();
          expect(_request.calledWith(
            'POST',
            '/frames',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#getFileStagingFrames', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.getFileStagingFrames(function() {
          _request.restore();
          expect(_request.calledWith(
            'GET',
            '/frames',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#getFileStagingFrameById', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.getFileStagingFrameById('myframe', function() {
          _request.restore();
          expect(_request.calledWith(
            'GET',
            '/frames/myframe',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#destroyFileStagingFrameById', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.destroyFileStagingFrameById('myframe', function() {
          _request.restore();
          expect(_request.calledWith(
            'DELETE',
            '/frames/myframe',
            {}
          )).to.equal(true);
          done();
        });
      });

    });

    describe('#addShardToFileStagingFrame', function() {

      it('should send the correct args to _request', function(done) {
        var _request = sinon.stub(BridgeClient.prototype, '_request').callsArg(
          3,
          null,
          {}
        );
        var client = new BridgeClient();
        client.addShardToFileStagingFrame('myframe', {
          meta: 'data'
        }, function() {
          _request.restore();
          expect(_request.calledWithMatch(
            'PUT',
            '/frames/myframe',
            { meta: 'data' }
          )).to.equal(true);
          done();
        });
      });

    });

  });

  describe('BridgeClient/Helpers', function() {

    describe('#resolveFileFromPointers', function() {



    });

  });

  describe('BridgeClient/Internal', function() {

    describe('#_request', function() {

      it('should bubble connection error', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, new Error('Failed'))
        });
        var client = new StubbedClient();
        client._request('GET', '/', {}, function(err) {
          expect(err.message).to.equal('Failed');
          done();
        });
      });

      it('should pass error if non-200 status', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, null, {
            statusCode: 400
          }, { error: 'Bad request' })
        });
        var client = new StubbedClient();
        client._request('DELETE', '/', {}, function(err) {
          expect(err.message).to.equal('Bad request');
          done();
        });
      });

      it('should pass body if non-200 status and no error', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, null, {
            statusCode: 400
          }, 'Bad request')
        });
        var client = new StubbedClient();
        client._request('DELETE', '/', {}, function(err) {
          expect(err.message).to.equal('Bad request');
          done();
        });
      });

      it('should pass the result back', function(done) {
        var StubbedClient = proxyquire('../lib/bridgeclient', {
          request: sinon.stub().callsArgWith(1, null, {
            statusCode: 200
          }, { hello: 'world' })
        });
        var client = new StubbedClient();
        client._request('POST', '/', {}, function(err, result) {
          expect(result.hello).to.equal('world');
          done();
        });
      });

    });

    describe('#_authenticate', function() {

      it('should sign the json payload with the keypair', function() {
        var client = new BridgeClient(null, {
          keypair: new KeyPair()
        });
        var options = {
          method: 'POST',
          json: { hello: 'world' },
          uri: 'https://api.storj.io/'
        };
        client._authenticate(options);
        expect(options.headers['x-pubkey']).to.not.equal(undefined);
        expect(options.headers['x-signature']).to.not.equal(undefined);
      });

      it('should sign the querystring with the keypair', function() {
        var client = new BridgeClient(null, {
          keypair: new KeyPair()
        });
        var options = {
          method: 'GET',
          qs: { hello: 'world' },
          uri: 'https://api.storj.io/'
        };
        client._authenticate(options);
        expect(options.headers['x-pubkey']).to.not.equal(undefined);
        expect(options.headers['x-signature']).to.not.equal(undefined);
      });

      it('should include email and password', function() {
        var client = new BridgeClient(null, {
          basicauth: {
            email: 'gordon@storj.io',
            password: 'password'
          }
        });
        var options = {};
        client._authenticate(options);
        expect(options.auth.pass).to.equal(
          '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
        );
      });

    });

  });

});
