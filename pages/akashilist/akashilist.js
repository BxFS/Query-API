const app = getApp();
var imageUtil = require('../../utils/util.js');

var akashilistView;
var akashilistTableShowView;
var akashiitemView;
var akashiitemTableShowView;

// Register a Page.
Page({
  data: {
    akashilistView,
    akashilistTableShowView,
    akashiitemView,
    akashiitemTableShowView
  },

  onLoad: function () {
    var that = this;
    that.setData({
      akashiTitleView: '今日改修'
    })
    wx.request({
      url: 'https://wx.kcwiki.org/query',
      //url: 'http://localhost:8080/WebApplication2/query',
      data: {
        query: 'akashilist'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.status != "success") {
          //console.log("query failed" + res.data.data);
          return;
        }
        var json = res.data.data;
        app.globalData.akashiData = res.data.data;
        //console.log("globalData" + app.globalData.akashiData);
        var arrs = [];
        var obj = [];
        var tmp = {};
        var list = [];
        var count = 0;
        var isAdd = false;
        for (var i in json) {
          isAdd = false;
          count++;
          //obj = [];
          //tmp = { id: json[i].id };
          //obj.push(json[i]);
          arrs.push(json[i]);
          //console.log(json[i]);
          if (count % 2 == 0) {
            list.push(arrs);
            arrs = [];
            isAdd = true;
          }
        };
        if (!isAdd) {
          list.push(arrs);
        }
        //console.log(list);
        that.setData({
          akashiTitleView: '今日改修',
          akashilistView: list,
          akashilistTableShowView: true
        })
      },
    })
  },

  getitem: function getitem(e) {
    var that = this;
    var wid = String(e.currentTarget.dataset.index);
    //console.log(wid);

    var json = app.globalData.akashiData;
    //console.log(json);
    for (var i in json) {
      if (wid == i) {
        //console.log(i + "-----" + "\n" + JSON.stringify(json[i]) + "\n");
        var ships = json[i].supportShip;
        var arrs = [];
        for (var i in ships) {
          arrs.push(ships[i].imgurl);
         //console.log(ships[i].imgurl);
        };

        //console.log(arrs);
        that.setData({
          akashiImgView: arrs
        });
        that.scrollToViewFn('shipimgTable');
        break;
      }
    };


      wx.request({
        url: 'https://wx.kcwiki.org/query',
        //url: 'http://localhost:8080/WebApplication2/query',
        data: {
          query: 'akashiitem',
          wid: wid
        },
        method: 'POST',
        header: {
          //'content-type': 'application/json', (GET模式才能用)
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function (res) {
          if (res.data.status != "success") {
            //console.log("query failed" + res.data.data);
            return;
          }
          var json = res.data.data.resource;
          //app.globalData.akashiData = res.data.data;
          //console.log("globalData" + app.globalData.akashiData);
          var arrs = [];
          var obj = [];
          var tmp = {};
          var resourcelist = [];
          var count = 0;
          var isAdd = false;
          
          for (var i in json) {
            var item = json[i];
            arrs = [];
            if (i == "title") {
              for (var j in item) {
                arrs.push(item[j]);
              }
              that.setData({
                akashititleView: arrs
              });
              //console.log(arrs);
              //list.push(arrs);
              //continue;
            }

            if (i == "level1") {
              arrs.push("0 ～ 5");
              for (var j in item) {
                arrs.push(item[j]);

              }
              tmp = { level1: arrs };
              //console.log(arrs);
              resourcelist.push(arrs);
            }

            if (i == "level2") {
              arrs.push("6 ～ 9");
              for (var j in item) {
                arrs.push(item[j]);

              }
              tmp = { level2: arrs };
              //console.log(arrs);
              resourcelist.push(arrs);
            }

            if (i == "MAX") {
              arrs.push("max");
              for (var j in item) {
                arrs.push(item[j]);

              }
              tmp = { max: arrs };
              //console.log(arrs);
              resourcelist.push(arrs);
            }

            if (i == "upgrade") {
              arrs.push("upgrade");
              arrs.push(item);
              tmp = { upgrade: arrs };
              //console.log("arrs" + arrs);
              resourcelist.push(arrs);
            }

            count++;
          }


         json = res.data.data.status;
         arrs = [];
         obj = [];
         tmp = {};
         var statuslist = [];
         count = 0;
         isAdd = false;

          for (var i in json) {
            var item = json[i];
            arrs = [];
            for (var j in item) {
              arrs.push(item[j]);
            }
            tmp = { id: i };
            obj.push(tmp);
            tmp = { arr: arrs };
            obj.push(tmp);
            statuslist.push(obj);
            //console.log(obj);
            arrs = [];
            obj = [];
            count++;
          }

          //console.log(resourcelist);
          //console.log(statuslist);

          that.setData({
            akashiitemView: resourcelist,
            akashistatusView: statuslist,
            akashiitemTableShowView: true
          });
          //that.scrollToViewFn('itemTable');
        },
      })
  },

  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

  backTo: function (e) {
    var page = e.target.dataset.index.toString();
    wx.navigateTo({
      url: '../' + page + '/' + page
    })
  },

  scrollToViewFn: function scrollToViewFn(view) {
    //var _id = e.target.dataset.id;
    this.setData({
      toView: view
    })
    //console.log(this.data.toView)
  },
})