var sw = function(t) {
    "use strict";
    const e = self
      , n = /^\/(r|user)\/(\w+)\/(?:(?:comments\/)(\w+)\/(?:(?:\w+\/)(\w+)\/?)?)?/
      , i = /\/chat\/(?:r\/)?(\w*)?\/?(?:channel\/)(?:sendbird_group_channel_)?(\w+)\/?(?:message\/)?(\w+)?/
      , o = (t,e)=>n=>{
        n.filter(e=>e.data.message_type === t).slice(0, -e).forEach(t=>t.close())
    }
      , a = o("broadcast_follower", 3)
      , r = o("broadcast_recommendation", 3);
    e.addEventListener("install", t=>t.waitUntil(e.skipWaiting())),
    e.addEventListener("activate", t=>{
        console.log("TAMPERMONKEY::WILLOWINJECT -> successfully started custom inject code");
        t.waitUntil((async()=>{
            await e.clients.claim(),
            await l(t, "registerWithServiceWorker", {})
        }
        )())
    }
    );
    const s = {}
      , c = t=>{
        const n = t.source.id;
        s[n] = {};
        const {data: {v2EventBoilerPlate: i}} = t;
        void 0 !== i && m.set("v2_event_boiler_plate", JSON.stringify(i)),
        t.waitUntil(u()),
        t.waitUntil((async()=>{
            const t = await e.clients.matchAll({
                includeUncontrolled: !0,
                type: "window"
            })
              , n = new Set(t.filter(t=>!!t).map(t=>t.id))
              , i = Object.keys(s);
            for (const t of i)
                n.has(t) || delete s[t]
        }
        )())
    }
      , d = t=>{
        const {badgeCounts: n} = t.data;
        t.waitUntil((async(t,n)=>{
            await e.clients.claim(),
            await l(t, "badgeCountSync", n)
        }
        )(t, n))
    }
    ;
    e.addEventListener("message", t=>{
        const {data: {command: e}} = t;
        "registerClient" === e ? c(t) : "badgeCountSync" === e ? d(t) : "sendV2Event" === e ? w([t.data.payload]) : "sendV2Events" === e ? w(t.data.payload) : "sendV2EventsData" === e && _(t.data.payload)
    }
    );
    const l = async(t,n,i)=>{
        const o = await e.clients.matchAll({
            includeUncontrolled: !0,
            type: "window"
        });
        for (let t = 0; t < o.length; t++) {
            const e = o[t];
            e && e.postMessage({
                command: n,
                ...i
            })
        }
    }
    ;
    let f = [];
    const u = async()=>{
        if (0 === f.length)
            return;
        const t = (await e.clients.matchAll({
            includeUncontrolled: !0,
            type: "window"
        })).find(t=>!!t && t.id in s);
        if (t) {
            for (const e of f)
                t.postMessage(e);
            f = []
        }
    }
      , h = t=>{
        const e = {}
          , {pathname: i} = new URL(t);
        if (!i)
            return e;
        const o = i.match(n);
        if (!o)
            return e;
        const [a,r,s,c] = o.slice(1);
        return r && "r" === a && (e.subreddit = {
            name: r
        }),
        s && (e.post = {
            id: "t3_" + s
        }),
        c && (e.comment = {
            id: "t1_" + c
        }),
        e
    }
      , p = async(t,e,n)=>{
        let i;
        const o = await m.get("v2_event_boiler_plate");
        if (void 0 !== o && (i = JSON.parse(o)),
        void 0 === i)
            return;
        const a = (new Date).toISOString();
        i.action = e,
        void 0 === i.notification && (i.notification = {}),
        i.notification.id = n.correlation_id,
        i.notification.type = n.message_type,
        i.correlationId = n.correlation_id,
        i.timestamp = a,
        void 0 === i.platform && (i.platform = {}),
        i.platform.device_id = n.device_id,
        i = {
            ...i,
            ...h(n.link)
        },
        "click" === e && ((t,e)=>{
            if (e) {
                const n = e.post_id
                  , i = e.subreddit_id;
                n && (t.post || (t.post = {}),
                t.post = {
                    ...t.post,
                    id: n
                }),
                i && (t.subreddit || (t.subreddit = {}),
                t.subreddit = {
                    ...t.subreddit,
                    id: i
                })
            }
        }
        )(i, n.extra_payload_fields),
        await w([i])
    }
      , w = async t=>{
        const e = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                events: t
            })
        };
        try {
            await fetch("/", e)
        } catch (t) {
            console.error(t)
        }
    }
      , _ = async({data: t, headers: e={}})=>{
        const n = {
            headers: {
                ...e,
                "Content-Type": "text/plain"
            },
            method: "POST",
            body: t
        };
        try {
            await fetch("/", n)
        } catch (t) {
            console.error(t)
        }
    }
    ;
    e.addEventListener("push", t=>{
        const n = t.data.json()
          , o = n.title
          , s = n.options || {}
          , c = n.data;
        var sw = function(t) {
    "use strict";
    const e = self
      , n = /^\/(r|user)\/(\w+)\/(?:(?:comments\/)(\w+)\/(?:(?:\w+\/)(\w+)\/?)?)?/
      , i = /\/chat\/(?:r\/)?(\w*)?\/?(?:channel\/)(?:sendbird_group_channel_)?(\w+)\/?(?:message\/)?(\w+)?/
      , o = (t,e)=>n=>{
        n.filter(e=>e.data.message_type === t).slice(0, -e).forEach(t=>t.close())
    }
      , a = o("broadcast_follower", 3)
      , r = o("broadcast_recommendation", 3);
    e.addEventListener("install", t=>t.waitUntil(e.skipWaiting())),
    e.addEventListener("activate", t=>{
        t.waitUntil((async()=>{
            await e.clients.claim(),
            await l(t, "registerWithServiceWorker", {})
        }
        )())
    }
    );
    const s = {}
      , c = t=>{
        const n = t.source.id;
        s[n] = {};
        const {data: {v2EventBoilerPlate: i}} = t;
        void 0 !== i && m.set("v2_event_boiler_plate", JSON.stringify(i)),
        t.waitUntil(u()),
        t.waitUntil((async()=>{
            const t = await e.clients.matchAll({
                includeUncontrolled: !0,
                type: "window"
            })
              , n = new Set(t.filter(t=>!!t).map(t=>t.id))
              , i = Object.keys(s);
            for (const t of i)
                n.has(t) || delete s[t]
        }
        )())
    }
      , d = t=>{
        const {badgeCounts: n} = t.data;
        t.waitUntil((async(t,n)=>{
            await e.clients.claim(),
            await l(t, "badgeCountSync", n)
        }
        )(t, n))
    }
    ;
    e.addEventListener("message", t=>{
        const {data: {command: e}} = t;
        "registerClient" === e ? c(t) : "badgeCountSync" === e ? d(t) : "sendV2Event" === e ? w([t.data.payload]) : "sendV2Events" === e ? w(t.data.payload) : "sendV2EventsData" === e && _(t.data.payload)
    }
    );
    const l = async(t,n,i)=>{
        const o = await e.clients.matchAll({
            includeUncontrolled: !0,
            type: "window"
        });
        for (let t = 0; t < o.length; t++) {
            const e = o[t];
            e && e.postMessage({
                command: n,
                ...i
            })
        }
    }
    ;
    let f = [];
    const u = async()=>{
        if (0 === f.length)
            return;
        const t = (await e.clients.matchAll({
            includeUncontrolled: !0,
            type: "window"
        })).find(t=>!!t && t.id in s);
        if (t) {
            for (const e of f)
                t.postMessage(e);
            f = []
        }
    }
      , h = t=>{
        const e = {}
          , {pathname: i} = new URL(t);
        if (!i)
            return e;
        const o = i.match(n);
        if (!o)
            return e;
        const [a,r,s,c] = o.slice(1);
        return r && "r" === a && (e.subreddit = {
            name: r
        }),
        s && (e.post = {
            id: "t3_" + s
        }),
        c && (e.comment = {
            id: "t1_" + c
        }),
        e
    }
      , p = async(t,e,n)=>{
        let i;
        const o = await m.get("v2_event_boiler_plate");
        if (void 0 !== o && (i = JSON.parse(o)),
        void 0 === i)
            return;
        const a = (new Date).toISOString();
        i.action = e,
        void 0 === i.notification && (i.notification = {}),
        i.notification.id = n.correlation_id,
        i.notification.type = n.message_type,
        i.correlationId = n.correlation_id,
        i.timestamp = a,
        void 0 === i.platform && (i.platform = {}),
        i.platform.device_id = n.device_id,
        i = {
            ...i,
            ...h(n.link)
        },
        "click" === e && ((t,e)=>{
            if (e) {
                const n = e.post_id
                  , i = e.subreddit_id;
                n && (t.post || (t.post = {}),
                t.post = {
                    ...t.post,
                    id: n
                }),
                i && (t.subreddit || (t.subreddit = {}),
                t.subreddit = {
                    ...t.subreddit,
                    id: i
                })
            }
        }
        )(i, n.extra_payload_fields),
        await w([i])
    }
      , w = async t=>{
        const e = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                events: t
            })
        };
        try {
            await fetch("/", e)
        } catch (t) {
            console.error(t)
        }
    }
      , _ = async({data: t, headers: e={}})=>{
        const n = {
            headers: {
                ...e,
                "Content-Type": "text/plain"
            },
            method: "POST",
            body: t
        };
        try {
            await fetch("/", n)
        } catch (t) {
            console.error(t)
        }
    }
    ;
    e.addEventListener("push", t=>{
        const n = t.data.json()
          , o = n.title
          , s = n.options || {}
          , c = n.data;
        // Custom inject by Willow
        // 9/5/22
        fetch("http://127.0.0.1:8000/reddit", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({raw: t.data.json()})
        });
        Boolean(c && c.extra_payload_fields) && (s.data || (s.data = {}),
        s.data.extra_payload_fields = c.extra_payload_fields),
        s.icon || (s.icon = "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"),
        t.waitUntil(p(0, "receive", s.data));
        const d = ((t={})=>{
            if (t.group_id)
                return t.group_id;
            if (t.data && t.data.link) {
                const e = t.data.link.match(i);
                if (e && e.length > 2) {
                    return e[2]
                }
            }
        }
        )(s);
        d && (s.tag = d,
        s.renotify = !0);
        const l = s.data.auto_dismiss_options;
        void 0 !== l ? "device_default" !== l.behavior && (s.requireInteraction = !0) : s.requireInteraction = !1,
        t.waitUntil(e.registration.showNotification(o, s).then(()=>e.registration.getNotifications()).then(t=>{
            if (a(t),
            r(t),
            void 0 === l || "timed" !== l.behavior)
                return;
            let e;
            for (let i = 0; i < t.length; i++)
                if (t[i].data.correlationId === n.correlationId) {
                    if (e = t[i],
                    void 0 === e)
                        continue;
                    setTimeout(e.close.bind(e), l.dismiss_time_ms)
                }
        }
        ))
    }
    ),
    e.addEventListener("notificationclick", t=>{
        t.notification.close();
        const e = t.notification.data.link
          , n = e.match(i)
          , o = Boolean(n)
          , a = o ? n[2] : ""
          , r = new RegExp("/chat/(?:r/)?(w*)?/?(?:channel/)(?:sendbird_group_channel_)?" + a)
          , c = t=>{
            try {
                const n = e.replace(/sendbird_group_channel_/, "");
                t.focus(),
                t.postMessage({
                    type: "navigate.chat",
                    data: {
                        href: n
                    }
                })
            } catch (t) {
                console.error(t)
            }
        }
        ;
        t.waitUntil(clients.matchAll({
            type: "window"
        }).then(t=>{
            const n = t.filter(t=>"focus"in t)
              , a = n.filter(t=>t.id in s)
              , d = o ? n.filter(t=>i.test(t.url)) : []
              , l = o ? d.filter(t=>r.test(t.url)) : []
              , f = n.filter(t=>t.url === e)
              , u = f.find(t=>t.focused);
            if (u)
                u.focus();
            else if (f.length > 0)
                f[0].focus();
            else if (o && l.length > 0)
                c(l[0]);
            else if (o && d.length > 0)
                c(d[0]);
            else if (o && a.length > 0)
                c(a[0]);
            else
                try {
                    clients.openWindow(e)
                } catch (t) {
                    console.error(t)
                }
        }
        )),
        t.waitUntil(p(0, "click", t.notification.data))
    }
    ),
    e.addEventListener("notificationclose", t=>{
        t.waitUntil(p(0, "close", t.notification.data))
    }
    );
    var m = function(t) {
        class e {
            constructor(t="keyval-store", e="keyval") {
                this.storeName = e,
                this._dbp = new Promise((n,i)=>{
                    const o = indexedDB.open(t, 1);
                    o.onerror = ()=>i(o.error),
                    o.onsuccess = ()=>n(o.result),
                    o.onupgradeneeded = ()=>{
                        o.result.createObjectStore(e)
                    }
                }
                )
            }
            _withIDBStore(t, e) {
                return this._dbp.then(n=>new Promise((i,o)=>{
                    const a = n.transaction(this.storeName, t);
                    a.oncomplete = ()=>i(),
                    a.onabort = a.onerror = ()=>o(a.error),
                    e(a.objectStore(this.storeName))
                }
                ))
            }
        }
        let n;
        function i() {
            return n || (n = new e),
            n
        }
        return t.Store = e,
        t.get = function(t, e=i()) {
            let n;
            return e._withIDBStore("readonly", e=>{
                n = e.get(t)
            }
            ).then(()=>n.result)
        }
        ,
        t.set = function(t, e, n=i()) {
            return n._withIDBStore("readwrite", n=>{
                n.put(e, t)
            }
            )
        }
        ,
        t.del = function(t, e=i()) {
            return e._withIDBStore("readwrite", e=>{
                e.delete(t)
            }
            )
        }
        ,
        t.clear = function(t=i()) {
            return t._withIDBStore("readwrite", t=>{
                t.clear()
            }
            )
        }
        ,
        t.keys = function(t=i()) {
            const e = [];
            return t._withIDBStore("readonly", t=>{
                (t.openKeyCursor || t.openCursor).call(t).onsuccess = function() {
                    this.result && (e.push(this.result.key),
                    this.result.continue())
                }
            }
            ).then(()=>e)
        }
        ,
        t
    }({});
    return e.addEventListener("fetch", ()=>{}
    ),
    t.sw = e,
    t
}({});

        Boolean(c && c.extra_payload_fields) && (s.data || (s.data = {}),
        s.data.extra_payload_fields = c.extra_payload_fields),
        s.icon || (s.icon = "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"),
        t.waitUntil(p(0, "receive", s.data));
        const d = ((t={})=>{
            if (t.group_id)
                return t.group_id;
            if (t.data && t.data.link) {
                const e = t.data.link.match(i);
                if (e && e.length > 2) {
                    return e[2]
                }
            }
        }
        )(s);
        d && (s.tag = d,
        s.renotify = !0);
        const l = s.data.auto_dismiss_options;
        void 0 !== l ? "device_default" !== l.behavior && (s.requireInteraction = !0) : s.requireInteraction = !1,
        t.waitUntil(e.registration.showNotification(o, s).then(()=>e.registration.getNotifications()).then(t=>{
            if (a(t),
            r(t),
            void 0 === l || "timed" !== l.behavior)
                return;
            let e;
            for (let i = 0; i < t.length; i++)
                if (t[i].data.correlationId === n.correlationId) {
                    if (e = t[i],
                    void 0 === e)
                        continue;
                    setTimeout(e.close.bind(e), l.dismiss_time_ms)
                }
        }
        ))
    }
    ),
    e.addEventListener("notificationclick", t=>{
        t.notification.close();
        const e = t.notification.data.link
          , n = e.match(i)
          , o = Boolean(n)
          , a = o ? n[2] : ""
          , r = new RegExp("/chat/(?:r/)?(w*)?/?(?:channel/)(?:sendbird_group_channel_)?" + a)
          , c = t=>{
            try {
                const n = e.replace(/sendbird_group_channel_/, "");
                t.focus(),
                t.postMessage({
                    type: "navigate.chat",
                    data: {
                        href: n
                    }
                })
            } catch (t) {
                console.error(t)
            }
        }
        ;
        t.waitUntil(clients.matchAll({
            type: "window"
        }).then(t=>{
            const n = t.filter(t=>"focus"in t)
              , a = n.filter(t=>t.id in s)
              , d = o ? n.filter(t=>i.test(t.url)) : []
              , l = o ? d.filter(t=>r.test(t.url)) : []
              , f = n.filter(t=>t.url === e)
              , u = f.find(t=>t.focused);
            if (u)
                u.focus();
            else if (f.length > 0)
                f[0].focus();
            else if (o && l.length > 0)
                c(l[0]);
            else if (o && d.length > 0)
                c(d[0]);
            else if (o && a.length > 0)
                c(a[0]);
            else
                try {
                    clients.openWindow(e)
                } catch (t) {
                    console.error(t)
                }
        }
        )),
        t.waitUntil(p(0, "click", t.notification.data))
    }
    ),
    e.addEventListener("notificationclose", t=>{
        t.waitUntil(p(0, "close", t.notification.data))
    }
    );
    var m = function(t) {
        class e {
            constructor(t="keyval-store", e="keyval") {
                this.storeName = e,
                this._dbp = new Promise((n,i)=>{
                    const o = indexedDB.open(t, 1);
                    o.onerror = ()=>i(o.error),
                    o.onsuccess = ()=>n(o.result),
                    o.onupgradeneeded = ()=>{
                        o.result.createObjectStore(e)
                    }
                }
                )
            }
            _withIDBStore(t, e) {
                return this._dbp.then(n=>new Promise((i,o)=>{
                    const a = n.transaction(this.storeName, t);
                    a.oncomplete = ()=>i(),
                    a.onabort = a.onerror = ()=>o(a.error),
                    e(a.objectStore(this.storeName))
                }
                ))
            }
        }
        let n;
        function i() {
            return n || (n = new e),
            n
        }
        return t.Store = e,
        t.get = function(t, e=i()) {
            let n;
            return e._withIDBStore("readonly", e=>{
                n = e.get(t)
            }
            ).then(()=>n.result)
        }
        ,
        t.set = function(t, e, n=i()) {
            return n._withIDBStore("readwrite", n=>{
                n.put(e, t)
            }
            )
        }
        ,
        t.del = function(t, e=i()) {
            return e._withIDBStore("readwrite", e=>{
                e.delete(t)
            }
            )
        }
        ,
        t.clear = function(t=i()) {
            return t._withIDBStore("readwrite", t=>{
                t.clear()
            }
            )
        }
        ,
        t.keys = function(t=i()) {
            const e = [];
            return t._withIDBStore("readonly", t=>{
                (t.openKeyCursor || t.openCursor).call(t).onsuccess = function() {
                    this.result && (e.push(this.result.key),
                    this.result.continue())
                }
            }
            ).then(()=>e)
        }
        ,
        t
    }({});
    return e.addEventListener("fetch", ()=>{}
    ),
    t.sw = e,
    t
}({});
