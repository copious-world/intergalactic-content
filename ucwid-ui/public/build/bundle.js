
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFoundation = /** @class */ (function () {
        function MDCFoundation(adapter) {
            if (adapter === void 0) { adapter = {}; }
            this.adapter = adapter;
        }
        Object.defineProperty(MDCFoundation, "cssClasses", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports every
                // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "strings", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "numbers", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "defaultAdapter", {
            get: function () {
                // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
                // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
                // validation.
                return {};
            },
            enumerable: false,
            configurable: true
        });
        MDCFoundation.prototype.init = function () {
            // Subclasses should override this method to perform initialization routines (registering events, etc.)
        };
        MDCFoundation.prototype.destroy = function () {
            // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
        };
        return MDCFoundation;
    }());

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Determine whether the current browser supports passive event listeners, and
     * if so, use them.
     */
    function applyPassive$1(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        return supportsPassiveOption(globalObj) ?
            { passive: true } :
            false;
    }
    function supportsPassiveOption(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        // See
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        var passiveSupported = false;
        try {
            var options = {
                // This function will be called when the browser
                // attempts to access the passive property.
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            var handler = function () { };
            globalObj.document.addEventListener('test', handler, options);
            globalObj.document.removeEventListener('test', handler, options);
        }
        catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    var events = /*#__PURE__*/Object.freeze({
        __proto__: null,
        applyPassive: applyPassive$1
    });

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
     * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
     */
    function closest(element, selector) {
        if (element.closest) {
            return element.closest(selector);
        }
        var el = element;
        while (el) {
            if (matches$1(el, selector)) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }
    function matches$1(element, selector) {
        var nativeMatches = element.matches
            || element.webkitMatchesSelector
            || element.msMatchesSelector;
        return nativeMatches.call(element, selector);
    }
    /**
     * Used to compute the estimated scroll width of elements. When an element is
     * hidden due to display: none; being applied to a parent element, the width is
     * returned as 0. However, the element will have a true width once no longer
     * inside a display: none context. This method computes an estimated width when
     * the element is hidden or returns the true width when the element is visble.
     * @param {Element} element the element whose width to estimate
     */
    function estimateScrollWidth(element) {
        // Check the offsetParent. If the element inherits display: none from any
        // parent, the offsetParent property will be null (see
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
        // This check ensures we only clone the node when necessary.
        var htmlEl = element;
        if (htmlEl.offsetParent !== null) {
            return htmlEl.scrollWidth;
        }
        var clone = htmlEl.cloneNode(true);
        clone.style.setProperty('position', 'absolute');
        clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
        document.documentElement.appendChild(clone);
        var scrollWidth = clone.scrollWidth;
        document.documentElement.removeChild(clone);
        return scrollWidth;
    }

    var ponyfill = /*#__PURE__*/Object.freeze({
        __proto__: null,
        closest: closest,
        matches: matches$1,
        estimateScrollWidth: estimateScrollWidth
    });

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$3 = {
        // Ripple is a special case where the "root" component is really a "mixin" of sorts,
        // given that it's an 'upgrade' to an existing component. That being said it is the root
        // CSS class that all other CSS classes derive from.
        BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
        FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
        FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
        ROOT: 'mdc-ripple-upgraded',
        UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    };
    var strings$4 = {
        VAR_FG_SCALE: '--mdc-ripple-fg-scale',
        VAR_FG_SIZE: '--mdc-ripple-fg-size',
        VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
        VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
        VAR_LEFT: '--mdc-ripple-left',
        VAR_TOP: '--mdc-ripple-top',
    };
    var numbers$1 = {
        DEACTIVATION_TIMEOUT_MS: 225,
        FG_DEACTIVATION_MS: 150,
        INITIAL_ORIGIN_SCALE: 0.6,
        PADDING: 10,
        TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
    };

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to
     * detect CSS custom variable support.
     */
    var supportsCssVariables_;
    function supportsCssVariables(windowObj, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        var CSS = windowObj.CSS;
        var supportsCssVars = supportsCssVariables_;
        if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
            return supportsCssVariables_;
        }
        var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
        if (!supportsFunctionPresent) {
            return false;
        }
        var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
        // See: https://bugs.webkit.org/show_bug.cgi?id=154669
        // See: README section on Safari
        var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
            CSS.supports('color', '#00000000'));
        supportsCssVars =
            explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
        if (!forceRefresh) {
            supportsCssVariables_ = supportsCssVars;
        }
        return supportsCssVars;
    }
    function getNormalizedEventCoords(evt, pageOffset, clientRect) {
        if (!evt) {
            return { x: 0, y: 0 };
        }
        var x = pageOffset.x, y = pageOffset.y;
        var documentX = x + clientRect.left;
        var documentY = y + clientRect.top;
        var normalizedX;
        var normalizedY;
        // Determine touch point relative to the ripple container.
        if (evt.type === 'touchstart') {
            var touchEvent = evt;
            normalizedX = touchEvent.changedTouches[0].pageX - documentX;
            normalizedY = touchEvent.changedTouches[0].pageY - documentY;
        }
        else {
            var mouseEvent = evt;
            normalizedX = mouseEvent.pageX - documentX;
            normalizedY = mouseEvent.pageY - documentY;
        }
        return { x: normalizedX, y: normalizedY };
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    // Activation events registered on the root element of each instance for activation
    var ACTIVATION_EVENT_TYPES = [
        'touchstart', 'pointerdown', 'mousedown', 'keydown',
    ];
    // Deactivation events registered on documentElement when a pointer-related down event occurs
    var POINTER_DEACTIVATION_EVENT_TYPES = [
        'touchend', 'pointerup', 'mouseup', 'contextmenu',
    ];
    // simultaneous nested activations
    var activatedTargets = [];
    var MDCRippleFoundation = /** @class */ (function (_super) {
        __extends(MDCRippleFoundation, _super);
        function MDCRippleFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;
            _this.activationAnimationHasEnded_ = false;
            _this.activationTimer_ = 0;
            _this.fgDeactivationRemovalTimer_ = 0;
            _this.fgScale_ = '0';
            _this.frame_ = { width: 0, height: 0 };
            _this.initialSize_ = 0;
            _this.layoutFrame_ = 0;
            _this.maxRadius_ = 0;
            _this.unboundedCoords_ = { left: 0, top: 0 };
            _this.activationState_ = _this.defaultActivationState_();
            _this.activationTimerCallback_ = function () {
                _this.activationAnimationHasEnded_ = true;
                _this.runDeactivationUXLogicIfReady_();
            };
            _this.activateHandler_ = function (e) { return _this.activate_(e); };
            _this.deactivateHandler_ = function () { return _this.deactivate_(); };
            _this.focusHandler_ = function () { return _this.handleFocus(); };
            _this.blurHandler_ = function () { return _this.handleBlur(); };
            _this.resizeHandler_ = function () { return _this.layout(); };
            return _this;
        }
        Object.defineProperty(MDCRippleFoundation, "cssClasses", {
            get: function () {
                return cssClasses$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "strings", {
            get: function () {
                return strings$4;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "numbers", {
            get: function () {
                return numbers$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    browserSupportsCssVars: function () { return true; },
                    computeBoundingRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    containsEventTarget: function () { return true; },
                    deregisterDocumentInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    deregisterResizeHandler: function () { return undefined; },
                    getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                    isSurfaceActive: function () { return true; },
                    isSurfaceDisabled: function () { return true; },
                    isUnbounded: function () { return true; },
                    registerDocumentInteractionHandler: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                    registerResizeHandler: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    updateCssVariable: function () { return undefined; },
                };
            },
            enumerable: false,
            configurable: true
        });
        MDCRippleFoundation.prototype.init = function () {
            var _this = this;
            var supportsPressRipple = this.supportsPressRipple_();
            this.registerRootHandlers_(supportsPressRipple);
            if (supportsPressRipple) {
                var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.addClass(ROOT_1);
                    if (_this.adapter.isUnbounded()) {
                        _this.adapter.addClass(UNBOUNDED_1);
                        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                        _this.layoutInternal_();
                    }
                });
            }
        };
        MDCRippleFoundation.prototype.destroy = function () {
            var _this = this;
            if (this.supportsPressRipple_()) {
                if (this.activationTimer_) {
                    clearTimeout(this.activationTimer_);
                    this.activationTimer_ = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
                }
                if (this.fgDeactivationRemovalTimer_) {
                    clearTimeout(this.fgDeactivationRemovalTimer_);
                    this.fgDeactivationRemovalTimer_ = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
                }
                var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.removeClass(ROOT_2);
                    _this.adapter.removeClass(UNBOUNDED_2);
                    _this.removeCssVars_();
                });
            }
            this.deregisterRootHandlers_();
            this.deregisterDeactivationHandlers_();
        };
        /**
         * @param evt Optional event containing position information.
         */
        MDCRippleFoundation.prototype.activate = function (evt) {
            this.activate_(evt);
        };
        MDCRippleFoundation.prototype.deactivate = function () {
            this.deactivate_();
        };
        MDCRippleFoundation.prototype.layout = function () {
            var _this = this;
            if (this.layoutFrame_) {
                cancelAnimationFrame(this.layoutFrame_);
            }
            this.layoutFrame_ = requestAnimationFrame(function () {
                _this.layoutInternal_();
                _this.layoutFrame_ = 0;
            });
        };
        MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
            var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
            if (unbounded) {
                this.adapter.addClass(UNBOUNDED);
            }
            else {
                this.adapter.removeClass(UNBOUNDED);
            }
        };
        MDCRippleFoundation.prototype.handleFocus = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        MDCRippleFoundation.prototype.handleBlur = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        /**
         * We compute this property so that we are not querying information about the client
         * until the point in time where the foundation requests it. This prevents scenarios where
         * client-side feature-detection may happen too early, such as when components are rendered on the server
         * and then initialized at mount time on the client.
         */
        MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
            return this.adapter.browserSupportsCssVars();
        };
        MDCRippleFoundation.prototype.defaultActivationState_ = function () {
            return {
                activationEvent: undefined,
                hasDeactivationUXRun: false,
                isActivated: false,
                isProgrammatic: false,
                wasActivatedByPointer: false,
                wasElementMadeActive: false,
            };
        };
        /**
         * supportsPressRipple Passed from init to save a redundant function call
         */
        MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
            var _this = this;
            if (supportsPressRipple) {
                ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                    _this.adapter.registerInteractionHandler(evtType, _this.activateHandler_);
                });
                if (this.adapter.isUnbounded()) {
                    this.adapter.registerResizeHandler(this.resizeHandler_);
                }
            }
            this.adapter.registerInteractionHandler('focus', this.focusHandler_);
            this.adapter.registerInteractionHandler('blur', this.blurHandler_);
        };
        MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
            var _this = this;
            if (evt.type === 'keydown') {
                this.adapter.registerInteractionHandler('keyup', this.deactivateHandler_);
            }
            else {
                POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                    _this.adapter.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
                });
            }
        };
        MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
            var _this = this;
            ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter.deregisterInteractionHandler(evtType, _this.activateHandler_);
            });
            this.adapter.deregisterInteractionHandler('focus', this.focusHandler_);
            this.adapter.deregisterInteractionHandler('blur', this.blurHandler_);
            if (this.adapter.isUnbounded()) {
                this.adapter.deregisterResizeHandler(this.resizeHandler_);
            }
        };
        MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
            var _this = this;
            this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler_);
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
            });
        };
        MDCRippleFoundation.prototype.removeCssVars_ = function () {
            var _this = this;
            var rippleStrings = MDCRippleFoundation.strings;
            var keys = Object.keys(rippleStrings);
            keys.forEach(function (key) {
                if (key.indexOf('VAR_') === 0) {
                    _this.adapter.updateCssVariable(rippleStrings[key], null);
                }
            });
        };
        MDCRippleFoundation.prototype.activate_ = function (evt) {
            var _this = this;
            if (this.adapter.isSurfaceDisabled()) {
                return;
            }
            var activationState = this.activationState_;
            if (activationState.isActivated) {
                return;
            }
            // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
            var previousActivationEvent = this.previousActivationEvent_;
            var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
            if (isSameInteraction) {
                return;
            }
            activationState.isActivated = true;
            activationState.isProgrammatic = evt === undefined;
            activationState.activationEvent = evt;
            activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
            var hasActivatedChild = evt !== undefined &&
                activatedTargets.length > 0 &&
                activatedTargets.some(function (target) { return _this.adapter.containsEventTarget(target); });
            if (hasActivatedChild) {
                // Immediately reset activation state, while preserving logic that prevents touch follow-on events
                this.resetActivationState_();
                return;
            }
            if (evt !== undefined) {
                activatedTargets.push(evt.target);
                this.registerDeactivationHandlers_(evt);
            }
            activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
            if (activationState.wasElementMadeActive) {
                this.animateActivation_();
            }
            requestAnimationFrame(function () {
                // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
                activatedTargets = [];
                if (!activationState.wasElementMadeActive
                    && evt !== undefined
                    && (evt.key === ' ' || evt.keyCode === 32)) {
                    // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                    // active states inconsistently when they're called within event handling code:
                    // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                    // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                    // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                    // variable is set within a rAF callback for a submit button interaction (#2241).
                    activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                    if (activationState.wasElementMadeActive) {
                        _this.animateActivation_();
                    }
                }
                if (!activationState.wasElementMadeActive) {
                    // Reset activation state immediately if element was not made active.
                    _this.activationState_ = _this.defaultActivationState_();
                }
            });
        };
        MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
            return (evt !== undefined && evt.type === 'keydown') ?
                this.adapter.isSurfaceActive() :
                true;
        };
        MDCRippleFoundation.prototype.animateActivation_ = function () {
            var _this = this;
            var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
            var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
            var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
            this.layoutInternal_();
            var translateStart = '';
            var translateEnd = '';
            if (!this.adapter.isUnbounded()) {
                var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
                translateStart = startPoint.x + "px, " + startPoint.y + "px";
                translateEnd = endPoint.x + "px, " + endPoint.y + "px";
            }
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
            // Cancel any ongoing activation/deactivation animations
            clearTimeout(this.activationTimer_);
            clearTimeout(this.fgDeactivationRemovalTimer_);
            this.rmBoundedActivationClasses_();
            this.adapter.removeClass(FG_DEACTIVATION);
            // Force layout in order to re-trigger the animation.
            this.adapter.computeBoundingRect();
            this.adapter.addClass(FG_ACTIVATION);
            this.activationTimer_ = setTimeout(function () { return _this.activationTimerCallback_(); }, DEACTIVATION_TIMEOUT_MS);
        };
        MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
            var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
            var startPoint;
            if (wasActivatedByPointer) {
                startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
            }
            else {
                startPoint = {
                    x: this.frame_.width / 2,
                    y: this.frame_.height / 2,
                };
            }
            // Center the element around the start point.
            startPoint = {
                x: startPoint.x - (this.initialSize_ / 2),
                y: startPoint.y - (this.initialSize_ / 2),
            };
            var endPoint = {
                x: (this.frame_.width / 2) - (this.initialSize_ / 2),
                y: (this.frame_.height / 2) - (this.initialSize_ / 2),
            };
            return { startPoint: startPoint, endPoint: endPoint };
        };
        MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
            var _this = this;
            // This method is called both when a pointing device is released, and when the activation animation ends.
            // The deactivation animation should only run after both of those occur.
            var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
            var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
            var activationHasEnded = hasDeactivationUXRun || !isActivated;
            if (activationHasEnded && this.activationAnimationHasEnded_) {
                this.rmBoundedActivationClasses_();
                this.adapter.addClass(FG_DEACTIVATION);
                this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                    _this.adapter.removeClass(FG_DEACTIVATION);
                }, numbers$1.FG_DEACTIVATION_MS);
            }
        };
        MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
            this.adapter.removeClass(FG_ACTIVATION);
            this.activationAnimationHasEnded_ = false;
            this.adapter.computeBoundingRect();
        };
        MDCRippleFoundation.prototype.resetActivationState_ = function () {
            var _this = this;
            this.previousActivationEvent_ = this.activationState_.activationEvent;
            this.activationState_ = this.defaultActivationState_();
            // Touch devices may fire additional events for the same interaction within a short time.
            // Store the previous event until it's safe to assume that subsequent events are for new interactions.
            setTimeout(function () { return _this.previousActivationEvent_ = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
        };
        MDCRippleFoundation.prototype.deactivate_ = function () {
            var _this = this;
            var activationState = this.activationState_;
            // This can happen in scenarios such as when you have a keyup event that blurs the element.
            if (!activationState.isActivated) {
                return;
            }
            var state = __assign({}, activationState);
            if (activationState.isProgrammatic) {
                requestAnimationFrame(function () { return _this.animateDeactivation_(state); });
                this.resetActivationState_();
            }
            else {
                this.deregisterDeactivationHandlers_();
                requestAnimationFrame(function () {
                    _this.activationState_.hasDeactivationUXRun = true;
                    _this.animateDeactivation_(state);
                    _this.resetActivationState_();
                });
            }
        };
        MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
            var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
            if (wasActivatedByPointer || wasElementMadeActive) {
                this.runDeactivationUXLogicIfReady_();
            }
        };
        MDCRippleFoundation.prototype.layoutInternal_ = function () {
            var _this = this;
            this.frame_ = this.adapter.computeBoundingRect();
            var maxDim = Math.max(this.frame_.height, this.frame_.width);
            // Surface diameter is treated differently for unbounded vs. bounded ripples.
            // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
            // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
            // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
            // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
            // `overflow: hidden`.
            var getBoundedRadius = function () {
                var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
                return hypotenuse + MDCRippleFoundation.numbers.PADDING;
            };
            this.maxRadius_ = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
            // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
            var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
            // Unbounded ripple size should always be even number to equally center align.
            if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
                this.initialSize_ = initialSize - 1;
            }
            else {
                this.initialSize_ = initialSize;
            }
            this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
            this.updateLayoutCssVars_();
        };
        MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
            var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
            this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
            this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
            if (this.adapter.isUnbounded()) {
                this.unboundedCoords_ = {
                    left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
                    top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
                };
                this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
                this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
            }
        };
        return MDCRippleFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$2 = {
        ACTIVE: 'mdc-tab-indicator--active',
        FADE: 'mdc-tab-indicator--fade',
        NO_TRANSITION: 'mdc-tab-indicator--no-transition',
    };
    var strings$3 = {
        CONTENT_SELECTOR: '.mdc-tab-indicator__content',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabIndicatorFoundation = /** @class */ (function (_super) {
        __extends(MDCTabIndicatorFoundation, _super);
        function MDCTabIndicatorFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCTabIndicatorFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCTabIndicatorFoundation, "cssClasses", {
            get: function () {
                return cssClasses$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabIndicatorFoundation, "strings", {
            get: function () {
                return strings$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabIndicatorFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    computeContentClientRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    setContentStyleProperty: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCTabIndicatorFoundation.prototype.computeContentClientRect = function () {
            return this.adapter.computeContentClientRect();
        };
        return MDCTabIndicatorFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /* istanbul ignore next: subclass is not a branch statement */
    var MDCFadingTabIndicatorFoundation = /** @class */ (function (_super) {
        __extends(MDCFadingTabIndicatorFoundation, _super);
        function MDCFadingTabIndicatorFoundation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCFadingTabIndicatorFoundation.prototype.activate = function () {
            this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
        };
        MDCFadingTabIndicatorFoundation.prototype.deactivate = function () {
            this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
        };
        return MDCFadingTabIndicatorFoundation;
    }(MDCTabIndicatorFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /* istanbul ignore next: subclass is not a branch statement */
    var MDCSlidingTabIndicatorFoundation = /** @class */ (function (_super) {
        __extends(MDCSlidingTabIndicatorFoundation, _super);
        function MDCSlidingTabIndicatorFoundation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCSlidingTabIndicatorFoundation.prototype.activate = function (previousIndicatorClientRect) {
            // Early exit if no indicator is present to handle cases where an indicator
            // may be activated without a prior indicator state
            if (!previousIndicatorClientRect) {
                this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
                return;
            }
            // This animation uses the FLIP approach. You can read more about it at the link below:
            // https://aerotwist.com/blog/flip-your-animations/
            // Calculate the dimensions based on the dimensions of the previous indicator
            var currentClientRect = this.computeContentClientRect();
            var widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
            var xPosition = previousIndicatorClientRect.left - currentClientRect.left;
            this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
            this.adapter.setContentStyleProperty('transform', "translateX(" + xPosition + "px) scaleX(" + widthDelta + ")");
            // Force repaint before updating classes and transform to ensure the transform properly takes effect
            this.computeContentClientRect();
            this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
            this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
            this.adapter.setContentStyleProperty('transform', '');
        };
        MDCSlidingTabIndicatorFoundation.prototype.deactivate = function () {
            this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
        };
        return MDCSlidingTabIndicatorFoundation;
    }(MDCTabIndicatorFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$1 = {
        ACTIVE: 'mdc-tab--active',
    };
    var strings$2 = {
        ARIA_SELECTED: 'aria-selected',
        CONTENT_SELECTOR: '.mdc-tab__content',
        INTERACTED_EVENT: 'MDCTab:interacted',
        RIPPLE_SELECTOR: '.mdc-tab__ripple',
        TABINDEX: 'tabIndex',
        TAB_INDICATOR_SELECTOR: '.mdc-tab-indicator',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabFoundation = /** @class */ (function (_super) {
        __extends(MDCTabFoundation, _super);
        function MDCTabFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCTabFoundation.defaultAdapter), adapter)) || this;
            _this.focusOnActivate_ = true;
            return _this;
        }
        Object.defineProperty(MDCTabFoundation, "cssClasses", {
            get: function () {
                return cssClasses$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabFoundation, "strings", {
            get: function () {
                return strings$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setAttr: function () { return undefined; },
                    activateIndicator: function () { return undefined; },
                    deactivateIndicator: function () { return undefined; },
                    notifyInteracted: function () { return undefined; },
                    getOffsetLeft: function () { return 0; },
                    getOffsetWidth: function () { return 0; },
                    getContentOffsetLeft: function () { return 0; },
                    getContentOffsetWidth: function () { return 0; },
                    focus: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCTabFoundation.prototype.handleClick = function () {
            // It's up to the parent component to keep track of the active Tab and
            // ensure we don't activate a Tab that's already active.
            this.adapter.notifyInteracted();
        };
        MDCTabFoundation.prototype.isActive = function () {
            return this.adapter.hasClass(cssClasses$1.ACTIVE);
        };
        /**
         * Sets whether the tab should focus itself when activated
         */
        MDCTabFoundation.prototype.setFocusOnActivate = function (focusOnActivate) {
            this.focusOnActivate_ = focusOnActivate;
        };
        /**
         * Activates the Tab
         */
        MDCTabFoundation.prototype.activate = function (previousIndicatorClientRect) {
            this.adapter.addClass(cssClasses$1.ACTIVE);
            this.adapter.setAttr(strings$2.ARIA_SELECTED, 'true');
            this.adapter.setAttr(strings$2.TABINDEX, '0');
            this.adapter.activateIndicator(previousIndicatorClientRect);
            if (this.focusOnActivate_) {
                this.adapter.focus();
            }
        };
        /**
         * Deactivates the Tab
         */
        MDCTabFoundation.prototype.deactivate = function () {
            // Early exit
            if (!this.isActive()) {
                return;
            }
            this.adapter.removeClass(cssClasses$1.ACTIVE);
            this.adapter.setAttr(strings$2.ARIA_SELECTED, 'false');
            this.adapter.setAttr(strings$2.TABINDEX, '-1');
            this.adapter.deactivateIndicator();
        };
        /**
         * Returns the dimensions of the Tab
         */
        MDCTabFoundation.prototype.computeDimensions = function () {
            var rootWidth = this.adapter.getOffsetWidth();
            var rootLeft = this.adapter.getOffsetLeft();
            var contentWidth = this.adapter.getContentOffsetWidth();
            var contentLeft = this.adapter.getContentOffsetLeft();
            return {
                contentLeft: rootLeft + contentLeft,
                contentRight: rootLeft + contentLeft + contentWidth,
                rootLeft: rootLeft,
                rootRight: rootLeft + rootWidth,
            };
        };
        return MDCTabFoundation;
    }(MDCFoundation));

    // Match modifiers on DOM events.
    const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
    // Match modifiers on other events.
    const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;

    function forwardEventsBuilder(component) {
      // This is our pseudo $on function. It is defined on component mount.
      let $on;
      // This is a list of events bound before mount.
      let events = [];
      // This is the original component $on function.
      const componentOn = component.$on;

      // And we override the $on function to forward all bound events.
      component.$on = (fullEventType, callback) => {
        let eventType = fullEventType;
        let destructor = () => {};
        if ($on) {
          // The event was bound programmatically.
          destructor = $on(eventType, callback);
        } else {
          // The event was bound before mount by Svelte.
          events.push([eventType, callback]);
        }
        const oldModifierMatch = eventType.match(oldModifierRegex);
        const newModifierMatch = eventType.match(newModifierRegex);
        const modifierMatch = oldModifierMatch || newModifierMatch;

        if (oldModifierMatch && console) {
          console.warn(
            'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
            eventType
          );
        }

        if (modifierMatch) {
          // Remove modifiers from the real event.
          const parts = eventType.split(oldModifierMatch ? ':' : '$');
          eventType = parts[0];
        }

        // Call the original $on function.
        const componentDestructor = componentOn.call(
          component,
          eventType,
          callback
        );

        return (...args) => {
          destructor();
          return componentDestructor(...args);
        };
      };

      function forward(e) {
        // Internally bubble the event up from Svelte components.
        bubble(component, e);
      }

      return (node) => {
        const destructors = [];
        const forwardDestructors = {};

        // This function is responsible for forwarding all bound events.
        $on = (fullEventType, callback) => {
          let eventType = fullEventType;
          let handler = callback;
          // DOM addEventListener options argument.
          let options = false;
          const oldModifierMatch = eventType.match(oldModifierRegex);
          const newModifierMatch = eventType.match(newModifierRegex);
          const modifierMatch = oldModifierMatch || newModifierMatch;
          if (modifierMatch) {
            // Parse the event modifiers.
            // Supported modifiers:
            // - preventDefault
            // - stopPropagation
            // - passive
            // - nonpassive
            // - capture
            // - once
            const parts = eventType.split(oldModifierMatch ? ':' : '$');
            eventType = parts[0];
            options = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
            if (options.nonpassive) {
              options.passive = false;
              delete options.nonpassive;
            }
            if (options.preventDefault) {
              handler = prevent_default(handler);
              delete options.preventDefault;
            }
            if (options.stopPropagation) {
              handler = stop_propagation(handler);
              delete options.stopPropagation;
            }
          }

          // Listen for the event directly, with the given options.
          const off = listen(node, eventType, handler, options);
          const destructor = () => {
            off();
            const idx = destructors.indexOf(destructor);
            if (idx > -1) {
              destructors.splice(idx, 1);
            }
          };

          destructors.push(destructor);

          // Forward the event from Svelte.
          if (!eventType in forwardDestructors) {
            forwardDestructors[eventType] = listen(node, eventType, forward);
          }

          return destructor;
        };

        for (let i = 0; i < events.length; i++) {
          // Listen to all the events added before mount.
          $on(events[i][0], events[i][1]);
        }

        return {
          destroy: () => {
            // Remove all event listeners.
            for (let i = 0; i < destructors.length; i++) {
              destructors[i]();
            }

            // Remove all event forwarders.
            for (let entry of Object.entries(forwardDestructors)) {
              entry[1]();
            }
          },
        };
      };
    }

    function classMap(classObj) {
      return Object.entries(classObj)
        .filter(([name, value]) => name !== '' && value)
        .map(([name]) => name)
        .join(' ');
    }

    function dispatch(
      element,
      eventType,
      detail = {},
      eventInit = { bubbles: true }
    ) {
      if (typeof Event !== 'undefined' && element) {
        const event = new Event(eventType, eventInit);
        event.detail = detail;
        const el = 'getElement' in element ? element.getElement() : element;
        el.dispatchEvent(event);
        return event;
      }
    }

    function exclude(obj, keys) {
      let names = Object.getOwnPropertyNames(obj);
      const newObj = {};

      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const cashIndex = name.indexOf('$');
        if (
          cashIndex !== -1 &&
          keys.indexOf(name.substring(0, cashIndex + 1)) !== -1
        ) {
          continue;
        }
        if (keys.indexOf(name) !== -1) {
          continue;
        }
        newObj[name] = obj[name];
      }

      return newObj;
    }

    function prefixFilter(obj, prefix) {
      let names = Object.getOwnPropertyNames(obj);
      const newObj = {};

      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        if (name.substring(0, prefix.length) === prefix) {
          newObj[name.substring(prefix.length)] = obj[name];
        }
      }

      return newObj;
    }

    function useActions(node, actions) {
      let objects = [];

      if (actions) {
        for (let i = 0; i < actions.length; i++) {
          const isArray = Array.isArray(actions[i]);
          const action = isArray ? actions[i][0] : actions[i];
          if (isArray && actions[i].length > 1) {
            objects.push(action(node, actions[i][1]));
          } else {
            objects.push(action(node));
          }
        }
      }

      return {
        update(actions) {
          if (((actions && actions.length) || 0) != objects.length) {
            throw new Error('You must not change the length of an actions array.');
          }

          if (actions) {
            for (let i = 0; i < actions.length; i++) {
              if (objects[i] && 'update' in objects[i]) {
                const isArray = Array.isArray(actions[i]);
                if (isArray && actions[i].length > 1) {
                  objects[i].update(actions[i][1]);
                } else {
                  objects[i].update();
                }
              }
            }
          }
        },

        destroy() {
          for (let i = 0; i < objects.length; i++) {
            if (objects[i] && 'destroy' in objects[i]) {
              objects[i].destroy();
            }
          }
        },
      };
    }

    const { applyPassive } = events;
    const { matches } = ponyfill;

    function Ripple(
      node,
      {
        ripple = true,
        surface = false,
        unbounded = false,
        disabled = false,
        color = null,
        active = null,
        eventTarget = null,
        activeTarget = null,
        addClass = (className) => node.classList.add(className),
        removeClass = (className) => node.classList.remove(className),
        addStyle = (name, value) => node.style.setProperty(name, value),
        initPromise = Promise.resolve(),
      } = {}
    ) {
      let instance;
      let addLayoutListener = getContext('SMUI:addLayoutListener');
      let removeLayoutListener;
      let oldActive = active;
      let oldEventTarget = eventTarget;
      let oldActiveTarget = activeTarget;

      function handleProps() {
        if (surface) {
          addClass('mdc-ripple-surface');
          if (color === 'primary') {
            addClass('smui-ripple-surface--primary');
            removeClass('smui-ripple-surface--secondary');
          } else if (color === 'secondary') {
            removeClass('smui-ripple-surface--primary');
            addClass('smui-ripple-surface--secondary');
          } else {
            removeClass('smui-ripple-surface--primary');
            removeClass('smui-ripple-surface--secondary');
          }
        }

        // Handle activation first.
        if (instance && oldActive !== active) {
          oldActive = active;
          if (active) {
            instance.activate();
          } else if (active === false) {
            instance.deactivate();
          }
        }

        // Then create/destroy an instance.
        if (ripple && !instance) {
          instance = new MDCRippleFoundation({
            addClass,
            browserSupportsCssVars: () => supportsCssVariables(window),
            computeBoundingRect: () => node.getBoundingClientRect(),
            containsEventTarget: (target) => node.contains(target),
            deregisterDocumentInteractionHandler: (evtType, handler) =>
              document.documentElement.removeEventListener(
                evtType,
                handler,
                applyPassive()
              ),
            deregisterInteractionHandler: (evtType, handler) =>
              (eventTarget || node).removeEventListener(
                evtType,
                handler,
                applyPassive()
              ),
            deregisterResizeHandler: (handler) =>
              window.removeEventListener('resize', handler),
            getWindowPageOffset: () => ({
              x: window.pageXOffset,
              y: window.pageYOffset,
            }),
            isSurfaceActive: () =>
              active == null ? matches(activeTarget || node, ':active') : active,
            isSurfaceDisabled: () => !!disabled,
            isUnbounded: () => !!unbounded,
            registerDocumentInteractionHandler: (evtType, handler) =>
              document.documentElement.addEventListener(
                evtType,
                handler,
                applyPassive()
              ),
            registerInteractionHandler: (evtType, handler) =>
              (eventTarget || node).addEventListener(
                evtType,
                handler,
                applyPassive()
              ),
            registerResizeHandler: (handler) =>
              window.addEventListener('resize', handler),
            removeClass,
            updateCssVariable: addStyle,
          });

          initPromise.then(() => {
            instance.init();
            instance.setUnbounded(unbounded);
          });
        } else if (instance && !ripple) {
          initPromise.then(() => {
            instance.destroy();
            instance = null;
          });
        }

        // Now handle event/active targets
        if (
          instance &&
          (oldEventTarget !== eventTarget || oldActiveTarget !== activeTarget)
        ) {
          oldEventTarget = eventTarget;
          oldActiveTarget = activeTarget;

          instance.destroy();
          requestAnimationFrame(() => {
            if (instance) {
              instance.init();
              instance.setUnbounded(unbounded);
            }
          });
        }

        if (!ripple && unbounded) {
          addClass('mdc-ripple-upgraded--unbounded');
        }
      }

      handleProps();

      if (addLayoutListener) {
        removeLayoutListener = addLayoutListener(layout);
      }

      function layout() {
        if (instance) {
          instance.layout();
        }
      }

      return {
        update(props) {
          ({
            ripple,
            surface,
            unbounded,
            disabled,
            color,
            active,
            eventTarget,
            activeTarget,
            addClass,
            removeClass,
            addStyle,
            initPromise,
          } = {
            ripple: true,
            surface: false,
            unbounded: false,
            disabled: false,
            color: null,
            active: null,
            eventTarget: null,
            activeTarget: null,
            addClass: (className) => node.classList.add(className),
            removeClass: (className) => node.classList.remove(className),
            addStyle: (name, value) => node.style.setProperty(name, value),
            initPromise: Promise.resolve(),
            ...props,
          });
          handleProps();
        },

        destroy() {
          if (instance) {
            instance.destroy();
            instance = null;
            removeClass('mdc-ripple-surface');
            removeClass('smui-ripple-surface--primary');
            removeClass('smui-ripple-surface--secondary');
          }

          if (removeLayoutListener) {
            removeLayoutListener();
          }
        },
      };
    }

    /* node_modules/.pnpm/@smui+common@4.2.0/node_modules/@smui/common/A.svelte generated by Svelte v3.46.4 */
    const file$7 = "node_modules/.pnpm/@smui+common@4.2.0/node_modules/@smui/common/A.svelte";

    function create_fragment$8(ctx) {
    	let a;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
    	let a_levels = [{ href: /*href*/ ctx[0] }, /*$$restProps*/ ctx[4]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			/*a_binding*/ ctx[8](a);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, a, /*use*/ ctx[1])),
    					action_destroyer(/*forwardEvents*/ ctx[3].call(null, a))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[6],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			/*a_binding*/ ctx[8](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const omit_props_names = ["href","use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('A', slots, ['default']);
    	let { href = 'javascript:void(0);' } = $$props;
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element = null;

    	function getElement() {
    		return element;
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(2, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('href' in $$new_props) $$invalidate(0, href = $$new_props.href);
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		href,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(2, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		href,
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		a_binding
    	];
    }

    class A extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$8, safe_not_equal, { href: 0, use: 1, getElement: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "A",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get href() {
    		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get use() {
    		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[5];
    	}

    	set getElement(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/.pnpm/@smui+common@4.2.0/node_modules/@smui/common/Button.svelte generated by Svelte v3.46.4 */
    const file$6 = "node_modules/.pnpm/@smui+common@4.2.0/node_modules/@smui/common/Button.svelte";

    function create_fragment$7(ctx) {
    	let button;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let button_levels = [/*$$restProps*/ ctx[3]];
    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			set_attributes(button, button_data);
    			add_location(button, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[7](button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, button, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, button))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			/*button_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element = null;

    	function getElement() {
    		return element;
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		button_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$7, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get use() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/.pnpm/@smui+tab-indicator@4.2.0/node_modules/@smui/tab-indicator/TabIndicator.svelte generated by Svelte v3.46.4 */

    const file$5 = "node_modules/.pnpm/@smui+tab-indicator@4.2.0/node_modules/@smui/tab-indicator/TabIndicator.svelte";

    function create_fragment$6(ctx) {
    	let span1;
    	let span0;
    	let span0_class_value;
    	let span0_style_value;
    	let span0_aria_hidden_value;
    	let useActions_action;
    	let span1_class_value;
    	let useActions_action_1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[21].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[20], null);

    	let span0_levels = [
    		{
    			class: span0_class_value = classMap({
    				[/*content$class*/ ctx[6]]: true,
    				'mdc-tab-indicator__content': true,
    				'mdc-tab-indicator__content--underline': /*type*/ ctx[3] === 'underline',
    				'mdc-tab-indicator__content--icon': /*type*/ ctx[3] === 'icon'
    			})
    		},
    		{
    			style: span0_style_value = Object.entries(/*contentStyles*/ ctx[10]).map(func$2).join(' ')
    		},
    		{
    			"aria-hidden": span0_aria_hidden_value = /*type*/ ctx[3] === 'icon' ? 'true' : null
    		},
    		prefixFilter(/*$$restProps*/ ctx[12], 'content$')
    	];

    	let span0_data = {};

    	for (let i = 0; i < span0_levels.length; i += 1) {
    		span0_data = assign(span0_data, span0_levels[i]);
    	}

    	let span1_levels = [
    		{
    			class: span1_class_value = classMap({
    				[/*className*/ ctx[2]]: true,
    				'mdc-tab-indicator': true,
    				'mdc-tab-indicator--active': /*active*/ ctx[0],
    				'mdc-tab-indicator--fade': /*transition*/ ctx[4] === 'fade',
    				.../*internalClasses*/ ctx[9]
    			})
    		},
    		exclude(/*$$restProps*/ ctx[12], ['content$'])
    	];

    	let span1_data = {};

    	for (let i = 0; i < span1_levels.length; i += 1) {
    		span1_data = assign(span1_data, span1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			span0 = element("span");
    			if (default_slot) default_slot.c();
    			set_attributes(span0, span0_data);
    			add_location(span0, file$5, 13, 2, 316);
    			set_attributes(span1, span1_data);
    			add_location(span1, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);

    			if (default_slot) {
    				default_slot.m(span0, null);
    			}

    			/*span0_binding*/ ctx[22](span0);
    			/*span1_binding*/ ctx[23](span1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, span0, /*content$use*/ ctx[5])),
    					action_destroyer(useActions_action_1 = useActions.call(null, span1, /*use*/ ctx[1])),
    					action_destroyer(/*forwardEvents*/ ctx[11].call(null, span1))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1048576)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[20],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[20])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[20], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(span0, span0_data = get_spread_update(span0_levels, [
    				(!current || dirty & /*content$class, type*/ 72 && span0_class_value !== (span0_class_value = classMap({
    					[/*content$class*/ ctx[6]]: true,
    					'mdc-tab-indicator__content': true,
    					'mdc-tab-indicator__content--underline': /*type*/ ctx[3] === 'underline',
    					'mdc-tab-indicator__content--icon': /*type*/ ctx[3] === 'icon'
    				}))) && { class: span0_class_value },
    				(!current || dirty & /*contentStyles*/ 1024 && span0_style_value !== (span0_style_value = Object.entries(/*contentStyles*/ ctx[10]).map(func$2).join(' '))) && { style: span0_style_value },
    				(!current || dirty & /*type*/ 8 && span0_aria_hidden_value !== (span0_aria_hidden_value = /*type*/ ctx[3] === 'icon' ? 'true' : null)) && { "aria-hidden": span0_aria_hidden_value },
    				dirty & /*$$restProps*/ 4096 && prefixFilter(/*$$restProps*/ ctx[12], 'content$')
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*content$use*/ 32) useActions_action.update.call(null, /*content$use*/ ctx[5]);

    			set_attributes(span1, span1_data = get_spread_update(span1_levels, [
    				(!current || dirty & /*className, active, transition, internalClasses*/ 533 && span1_class_value !== (span1_class_value = classMap({
    					[/*className*/ ctx[2]]: true,
    					'mdc-tab-indicator': true,
    					'mdc-tab-indicator--active': /*active*/ ctx[0],
    					'mdc-tab-indicator--fade': /*transition*/ ctx[4] === 'fade',
    					.../*internalClasses*/ ctx[9]
    				}))) && { class: span1_class_value },
    				dirty & /*$$restProps*/ 4096 && exclude(/*$$restProps*/ ctx[12], ['content$'])
    			]));

    			if (useActions_action_1 && is_function(useActions_action_1.update) && dirty & /*use*/ 2) useActions_action_1.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    			if (default_slot) default_slot.d(detaching);
    			/*span0_binding*/ ctx[22](null);
    			/*span1_binding*/ ctx[23](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$2 = ([name, value]) => `${name}: ${value};`;

    function instance_1$3($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","active","type","transition","content$use","content$class","activate","deactivate","computeContentClientRect","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TabIndicator', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { active = false } = $$props;
    	let { type = 'underline' } = $$props;
    	let { transition = 'slide' } = $$props;
    	let { content$use = [] } = $$props;
    	let { content$class = '' } = $$props;
    	let element;
    	let instance;
    	let content;
    	let internalClasses = {};
    	let contentStyles = {};
    	let changeSets = [];
    	let oldTransition = transition;

    	onMount(() => {
    		$$invalidate(17, instance = getInstance());
    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function getInstance() {
    		const Foundation = ({
    			fade: MDCFadingTabIndicatorFoundation,
    			slide: MDCSlidingTabIndicatorFoundation
    		})[transition] || MDCSlidingTabIndicatorFoundation;

    		return Foundation
    		? new Foundation({
    					addClass: (...props) => doChange(() => addClass(...props)),
    					removeClass: (...props) => doChange(() => removeClass(...props)),
    					computeContentClientRect,
    					setContentStyleProperty: (...props) => doChange(() => addContentStyle(...props))
    				})
    		: undefined;
    	}

    	function doChange(fn) {
    		if (changeSets.length) {
    			changeSets[changeSets.length - 1].push(fn);
    		} else {
    			fn();
    		}
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(9, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(9, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addContentStyle(name, value) {
    		if (contentStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete contentStyles[name];
    				((($$invalidate(10, contentStyles), $$invalidate(19, oldTransition)), $$invalidate(4, transition)), $$invalidate(17, instance));
    			} else {
    				$$invalidate(10, contentStyles[name] = value, contentStyles);
    			}
    		}
    	}

    	function activate(previousIndicatorClientRect) {
    		$$invalidate(0, active = true);
    		instance.activate(previousIndicatorClientRect);
    	}

    	function deactivate() {
    		$$invalidate(0, active = false);
    		instance.deactivate();
    	}

    	function computeContentClientRect() {
    		changeSets.push([]);
    		$$invalidate(18, changeSets);
    		return content.getBoundingClientRect();
    	}

    	function getElement() {
    		return element;
    	}

    	function span0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			content = $$value;
    			$$invalidate(8, content);
    		});
    	}

    	function span1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(7, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('active' in $$new_props) $$invalidate(0, active = $$new_props.active);
    		if ('type' in $$new_props) $$invalidate(3, type = $$new_props.type);
    		if ('transition' in $$new_props) $$invalidate(4, transition = $$new_props.transition);
    		if ('content$use' in $$new_props) $$invalidate(5, content$use = $$new_props.content$use);
    		if ('content$class' in $$new_props) $$invalidate(6, content$class = $$new_props.content$class);
    		if ('$$scope' in $$new_props) $$invalidate(20, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCFadingTabIndicatorFoundation,
    		MDCSlidingTabIndicatorFoundation,
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		active,
    		type,
    		transition,
    		content$use,
    		content$class,
    		element,
    		instance,
    		content,
    		internalClasses,
    		contentStyles,
    		changeSets,
    		oldTransition,
    		getInstance,
    		doChange,
    		addClass,
    		removeClass,
    		addContentStyle,
    		activate,
    		deactivate,
    		computeContentClientRect,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('active' in $$props) $$invalidate(0, active = $$new_props.active);
    		if ('type' in $$props) $$invalidate(3, type = $$new_props.type);
    		if ('transition' in $$props) $$invalidate(4, transition = $$new_props.transition);
    		if ('content$use' in $$props) $$invalidate(5, content$use = $$new_props.content$use);
    		if ('content$class' in $$props) $$invalidate(6, content$class = $$new_props.content$class);
    		if ('element' in $$props) $$invalidate(7, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(17, instance = $$new_props.instance);
    		if ('content' in $$props) $$invalidate(8, content = $$new_props.content);
    		if ('internalClasses' in $$props) $$invalidate(9, internalClasses = $$new_props.internalClasses);
    		if ('contentStyles' in $$props) $$invalidate(10, contentStyles = $$new_props.contentStyles);
    		if ('changeSets' in $$props) $$invalidate(18, changeSets = $$new_props.changeSets);
    		if ('oldTransition' in $$props) $$invalidate(19, oldTransition = $$new_props.oldTransition);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*oldTransition, transition, instance*/ 655376) {
    			if (oldTransition !== transition) {
    				$$invalidate(19, oldTransition = transition);
    				instance && instance.destroy();
    				$$invalidate(9, internalClasses = {});
    				$$invalidate(10, contentStyles = {});
    				$$invalidate(17, instance = getInstance());
    				instance.init();
    			}
    		}

    		if ($$self.$$.dirty & /*changeSets*/ 262144) {
    			// Use sets of changes for DOM updates, to facilitate animations.
    			if (changeSets.length) {
    				requestAnimationFrame(() => {
    					const changeSet = changeSets.shift();
    					$$invalidate(18, changeSets);

    					for (const fn of changeSet) {
    						fn();
    					}
    				});
    			}
    		}
    	};

    	return [
    		active,
    		use,
    		className,
    		type,
    		transition,
    		content$use,
    		content$class,
    		element,
    		content,
    		internalClasses,
    		contentStyles,
    		forwardEvents,
    		$$restProps,
    		activate,
    		deactivate,
    		computeContentClientRect,
    		getElement,
    		instance,
    		changeSets,
    		oldTransition,
    		$$scope,
    		slots,
    		span0_binding,
    		span1_binding
    	];
    }

    class TabIndicator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$3, create_fragment$6, safe_not_equal, {
    			use: 1,
    			class: 2,
    			active: 0,
    			type: 3,
    			transition: 4,
    			content$use: 5,
    			content$class: 6,
    			activate: 13,
    			deactivate: 14,
    			computeContentClientRect: 15,
    			getElement: 16
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TabIndicator",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get use() {
    		throw new Error("<TabIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<TabIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<TabIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<TabIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transition() {
    		throw new Error("<TabIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transition(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content$use() {
    		throw new Error("<TabIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content$use(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content$class() {
    		throw new Error("<TabIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content$class(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activate() {
    		return this.$$.ctx[13];
    	}

    	set activate(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get deactivate() {
    		return this.$$.ctx[14];
    	}

    	set deactivate(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get computeContentClientRect() {
    		return this.$$.ctx[15];
    	}

    	set computeContentClientRect(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[16];
    	}

    	set getElement(value) {
    		throw new Error("<TabIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/.pnpm/@smui+tab@4.2.0/node_modules/@smui/tab/Tab.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1 } = globals;
    const file$4 = "node_modules/.pnpm/@smui+tab@4.2.0/node_modules/@smui/tab/Tab.svelte";
    const get_tab_indicator_slot_changes_1 = dirty => ({});
    const get_tab_indicator_slot_context_1 = ctx => ({});
    const get_tab_indicator_slot_changes = dirty => ({});
    const get_tab_indicator_slot_context = ctx => ({});

    // (48:4) {#if indicatorSpanOnlyContent}
    function create_if_block_1$1(ctx) {
    	let tabindicator;
    	let current;

    	const tabindicator_spread_levels = [
    		{ active: /*active*/ ctx[18] },
    		prefixFilter(/*$$restProps*/ ctx[24], 'tabIndicator$')
    	];

    	let tabindicator_props = {
    		$$slots: { default: [create_default_slot_2$1] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < tabindicator_spread_levels.length; i += 1) {
    		tabindicator_props = assign(tabindicator_props, tabindicator_spread_levels[i]);
    	}

    	tabindicator = new TabIndicator({
    			props: tabindicator_props,
    			$$inline: true
    		});

    	/*tabindicator_binding*/ ctx[31](tabindicator);

    	const block = {
    		c: function create() {
    			create_component(tabindicator.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tabindicator, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tabindicator_changes = (dirty[0] & /*active, $$restProps*/ 17039360)
    			? get_spread_update(tabindicator_spread_levels, [
    					dirty[0] & /*active*/ 262144 && { active: /*active*/ ctx[18] },
    					dirty[0] & /*$$restProps*/ 16777216 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[24], 'tabIndicator$'))
    				])
    			: {};

    			if (dirty[1] & /*$$scope*/ 16) {
    				tabindicator_changes.$$scope = { dirty, ctx };
    			}

    			tabindicator.$set(tabindicator_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabindicator.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabindicator.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*tabindicator_binding*/ ctx[31](null);
    			destroy_component(tabindicator, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(48:4) {#if indicatorSpanOnlyContent}",
    		ctx
    	});

    	return block;
    }

    // (49:6) <TabIndicator         bind:this={tabIndicator}         {active}         {...prefixFilter($$restProps, 'tabIndicator$')}         >
    function create_default_slot_2$1(ctx) {
    	let current;
    	const tab_indicator_slot_template = /*#slots*/ ctx[30]["tab-indicator"];
    	const tab_indicator_slot = create_slot(tab_indicator_slot_template, ctx, /*$$scope*/ ctx[35], get_tab_indicator_slot_context);

    	const block = {
    		c: function create() {
    			if (tab_indicator_slot) tab_indicator_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (tab_indicator_slot) {
    				tab_indicator_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (tab_indicator_slot) {
    				if (tab_indicator_slot.p && (!current || dirty[1] & /*$$scope*/ 16)) {
    					update_slot_base(
    						tab_indicator_slot,
    						tab_indicator_slot_template,
    						ctx,
    						/*$$scope*/ ctx[35],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[35])
    						: get_slot_changes(tab_indicator_slot_template, /*$$scope*/ ctx[35], dirty, get_tab_indicator_slot_changes),
    						get_tab_indicator_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tab_indicator_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tab_indicator_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (tab_indicator_slot) tab_indicator_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(49:6) <TabIndicator         bind:this={tabIndicator}         {active}         {...prefixFilter($$restProps, 'tabIndicator$')}         >",
    		ctx
    	});

    	return block;
    }

    // (57:2) {#if !indicatorSpanOnlyContent}
    function create_if_block$1(ctx) {
    	let tabindicator;
    	let current;

    	const tabindicator_spread_levels = [
    		{ active: /*active*/ ctx[18] },
    		prefixFilter(/*$$restProps*/ ctx[24], 'tabIndicator$')
    	];

    	let tabindicator_props = {
    		$$slots: { default: [create_default_slot_1$1] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < tabindicator_spread_levels.length; i += 1) {
    		tabindicator_props = assign(tabindicator_props, tabindicator_spread_levels[i]);
    	}

    	tabindicator = new TabIndicator({
    			props: tabindicator_props,
    			$$inline: true
    		});

    	/*tabindicator_binding_1*/ ctx[33](tabindicator);

    	const block = {
    		c: function create() {
    			create_component(tabindicator.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tabindicator, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tabindicator_changes = (dirty[0] & /*active, $$restProps*/ 17039360)
    			? get_spread_update(tabindicator_spread_levels, [
    					dirty[0] & /*active*/ 262144 && { active: /*active*/ ctx[18] },
    					dirty[0] & /*$$restProps*/ 16777216 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[24], 'tabIndicator$'))
    				])
    			: {};

    			if (dirty[1] & /*$$scope*/ 16) {
    				tabindicator_changes.$$scope = { dirty, ctx };
    			}

    			tabindicator.$set(tabindicator_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabindicator.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabindicator.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*tabindicator_binding_1*/ ctx[33](null);
    			destroy_component(tabindicator, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(57:2) {#if !indicatorSpanOnlyContent}",
    		ctx
    	});

    	return block;
    }

    // (58:4) <TabIndicator       bind:this={tabIndicator}       {active}       {...prefixFilter($$restProps, 'tabIndicator$')}       >
    function create_default_slot_1$1(ctx) {
    	let current;
    	const tab_indicator_slot_template = /*#slots*/ ctx[30]["tab-indicator"];
    	const tab_indicator_slot = create_slot(tab_indicator_slot_template, ctx, /*$$scope*/ ctx[35], get_tab_indicator_slot_context_1);

    	const block = {
    		c: function create() {
    			if (tab_indicator_slot) tab_indicator_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (tab_indicator_slot) {
    				tab_indicator_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (tab_indicator_slot) {
    				if (tab_indicator_slot.p && (!current || dirty[1] & /*$$scope*/ 16)) {
    					update_slot_base(
    						tab_indicator_slot,
    						tab_indicator_slot_template,
    						ctx,
    						/*$$scope*/ ctx[35],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[35])
    						: get_slot_changes(tab_indicator_slot_template, /*$$scope*/ ctx[35], dirty, get_tab_indicator_slot_changes_1),
    						get_tab_indicator_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tab_indicator_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tab_indicator_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (tab_indicator_slot) tab_indicator_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(58:4) <TabIndicator       bind:this={tabIndicator}       {active}       {...prefixFilter($$restProps, 'tabIndicator$')}       >",
    		ctx
    	});

    	return block;
    }

    // (1:0) <svelte:component   this={component}   bind:this={element}   use={[     [       Ripple,       {         ripple,         unbounded: false,         addClass,         removeClass,         addStyle,       },     ],     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-tab': true,     'mdc-tab--active': active,     'mdc-tab--stacked': stacked,     'mdc-tab--min-width': minWidth,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   role="tab"   aria-selected={active ? 'true' : 'false'}   tabindex={active || forceAccessible ? '0' : '-1'}   {href}   on:click={instance && instance.handleClick()}   {...internalAttrs}   {...exclude($$restProps, ['content$', 'tabIndicator$'])} >
    function create_default_slot$3(ctx) {
    	let span0;
    	let t0;
    	let span0_class_value;
    	let useActions_action;
    	let t1;
    	let t2;
    	let span1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[30].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[35], null);
    	let if_block0 = /*indicatorSpanOnlyContent*/ ctx[6] && create_if_block_1$1(ctx);

    	let span0_levels = [
    		{
    			class: span0_class_value = classMap({
    				[/*content$class*/ ctx[9]]: true,
    				'mdc-tab__content': true
    			})
    		},
    		prefixFilter(/*$$restProps*/ ctx[24], 'content$')
    	];

    	let span0_data = {};

    	for (let i = 0; i < span0_levels.length; i += 1) {
    		span0_data = assign(span0_data, span0_levels[i]);
    	}

    	let if_block1 = !/*indicatorSpanOnlyContent*/ ctx[6] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			if (default_slot) default_slot.c();
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			span1 = element("span");
    			set_attributes(span0, span0_data);
    			add_location(span0, file$4, 37, 2, 818);
    			attr_dev(span1, "class", "mdc-tab__ripple");
    			add_location(span1, file$4, 64, 2, 1497);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);

    			if (default_slot) {
    				default_slot.m(span0, null);
    			}

    			append_dev(span0, t0);
    			if (if_block0) if_block0.m(span0, null);
    			/*span0_binding*/ ctx[32](span0);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, span1, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(useActions_action = useActions.call(null, span0, /*content$use*/ ctx[8]));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[35],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[35])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[35], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*indicatorSpanOnlyContent*/ ctx[6]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*indicatorSpanOnlyContent*/ 64) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(span0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			set_attributes(span0, span0_data = get_spread_update(span0_levels, [
    				(!current || dirty[0] & /*content$class*/ 512 && span0_class_value !== (span0_class_value = classMap({
    					[/*content$class*/ ctx[9]]: true,
    					'mdc-tab__content': true
    				}))) && { class: span0_class_value },
    				dirty[0] & /*$$restProps*/ 16777216 && prefixFilter(/*$$restProps*/ ctx[24], 'content$')
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*content$use*/ 256) useActions_action.update.call(null, /*content$use*/ ctx[8]);

    			if (!/*indicatorSpanOnlyContent*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*indicatorSpanOnlyContent*/ 64) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t2.parentNode, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block0) if_block0.d();
    			/*span0_binding*/ ctx[32](null);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(span1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[     [       Ripple,       {         ripple,         unbounded: false,         addClass,         removeClass,         addStyle,       },     ],     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-tab': true,     'mdc-tab--active': active,     'mdc-tab--stacked': stacked,     'mdc-tab--min-width': minWidth,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   role=\\\"tab\\\"   aria-selected={active ? 'true' : 'false'}   tabindex={active || forceAccessible ? '0' : '-1'}   {href}   on:click={instance && instance.handleClick()}   {...internalAttrs}   {...exclude($$restProps, ['content$', 'tabIndicator$'])} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [
    				[
    					Ripple,
    					{
    						ripple: /*ripple*/ ctx[3],
    						unbounded: false,
    						addClass: /*addClass*/ ctx[21],
    						removeClass: /*removeClass*/ ctx[22],
    						addStyle: /*addStyle*/ ctx[23]
    					}
    				],
    				/*forwardEvents*/ ctx[20],
    				.../*use*/ ctx[0]
    			]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-tab': true,
    				'mdc-tab--active': /*active*/ ctx[18],
    				'mdc-tab--stacked': /*stacked*/ ctx[4],
    				'mdc-tab--min-width': /*minWidth*/ ctx[5],
    				.../*internalClasses*/ ctx[15]
    			})
    		},
    		{
    			style: Object.entries(/*internalStyles*/ ctx[16]).map(func$1).concat([/*style*/ ctx[2]]).join(' ')
    		},
    		{ role: "tab" },
    		{
    			"aria-selected": /*active*/ ctx[18] ? 'true' : 'false'
    		},
    		{
    			tabindex: /*active*/ ctx[18] || /*forceAccessible*/ ctx[19]
    			? '0'
    			: '-1'
    		},
    		{ href: /*href*/ ctx[7] },
    		/*internalAttrs*/ ctx[17],
    		exclude(/*$$restProps*/ ctx[24], ['content$', 'tabIndicator$'])
    	];

    	var switch_value = /*component*/ ctx[10];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$3] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		/*switch_instance_binding*/ ctx[34](switch_instance);

    		switch_instance.$on("click", function () {
    			if (is_function(/*instance*/ ctx[11] && /*instance*/ ctx[11].handleClick())) (/*instance*/ ctx[11] && /*instance*/ ctx[11].handleClick()).apply(this, arguments);
    		});
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			const switch_instance_changes = (dirty[0] & /*ripple, addClass, removeClass, addStyle, forwardEvents, use, className, active, stacked, minWidth, internalClasses, internalStyles, style, forceAccessible, href, internalAttrs, $$restProps*/ 33521855)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*ripple, addClass, removeClass, addStyle, forwardEvents, use*/ 15728649 && {
    						use: [
    							[
    								Ripple,
    								{
    									ripple: /*ripple*/ ctx[3],
    									unbounded: false,
    									addClass: /*addClass*/ ctx[21],
    									removeClass: /*removeClass*/ ctx[22],
    									addStyle: /*addStyle*/ ctx[23]
    								}
    							],
    							/*forwardEvents*/ ctx[20],
    							.../*use*/ ctx[0]
    						]
    					},
    					dirty[0] & /*className, active, stacked, minWidth, internalClasses*/ 294962 && {
    						class: classMap({
    							[/*className*/ ctx[1]]: true,
    							'mdc-tab': true,
    							'mdc-tab--active': /*active*/ ctx[18],
    							'mdc-tab--stacked': /*stacked*/ ctx[4],
    							'mdc-tab--min-width': /*minWidth*/ ctx[5],
    							.../*internalClasses*/ ctx[15]
    						})
    					},
    					dirty[0] & /*internalStyles, style*/ 65540 && {
    						style: Object.entries(/*internalStyles*/ ctx[16]).map(func$1).concat([/*style*/ ctx[2]]).join(' ')
    					},
    					switch_instance_spread_levels[3],
    					dirty[0] & /*active*/ 262144 && {
    						"aria-selected": /*active*/ ctx[18] ? 'true' : 'false'
    					},
    					dirty[0] & /*active, forceAccessible*/ 786432 && {
    						tabindex: /*active*/ ctx[18] || /*forceAccessible*/ ctx[19]
    						? '0'
    						: '-1'
    					},
    					dirty[0] & /*href*/ 128 && { href: /*href*/ ctx[7] },
    					dirty[0] & /*internalAttrs*/ 131072 && get_spread_object(/*internalAttrs*/ ctx[17]),
    					dirty[0] & /*$$restProps*/ 16777216 && get_spread_object(exclude(/*$$restProps*/ ctx[24], ['content$', 'tabIndicator$']))
    				])
    			: {};

    			if (dirty[0] & /*active, $$restProps, tabIndicator, indicatorSpanOnlyContent, content$class, content, content$use*/ 17064768 | dirty[1] & /*$$scope*/ 16) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[10])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					/*switch_instance_binding*/ ctx[34](switch_instance);

    					switch_instance.$on("click", function () {
    						if (is_function(/*instance*/ ctx[11] && /*instance*/ ctx[11].handleClick())) (/*instance*/ ctx[11] && /*instance*/ ctx[11].handleClick()).apply(this, arguments);
    					});

    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[34](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$1 = ([name, value]) => `${name}: ${value};`;

    function instance_1$2($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","tab","ripple","stacked","minWidth","indicatorSpanOnlyContent","href","content$use","content$class","component","activate","deactivate","focus","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tab', slots, ['default','tab-indicator']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { tab: tabId } = $$props;
    	let { ripple = true } = $$props;
    	let { stacked = false } = $$props;
    	let { minWidth = false } = $$props;
    	let { indicatorSpanOnlyContent = false } = $$props;
    	let { href = null } = $$props;
    	let { content$use = [] } = $$props;
    	let { content$class = '' } = $$props;
    	let element;
    	let instance;
    	let content;
    	let tabIndicator;
    	let internalClasses = {};
    	let internalStyles = {};
    	let internalAttrs = {};
    	let focusOnActivate = getContext('SMUI:tab:focusOnActivate');
    	let active = tabId === getContext('SMUI:tab:initialActive');
    	let forceAccessible = false;
    	let { component = href == null ? Button : A } = $$props;
    	setContext('SMUI:label:context', 'tab');
    	setContext('SMUI:icon:context', 'tab');

    	if (!tabId) {
    		throw new Error('The tab property is required! It should be passed down from the TabBar to the Tab.');
    	}

    	onMount(() => {
    		$$invalidate(11, instance = new MDCTabFoundation({
    				setAttr: addAttr,
    				addClass,
    				removeClass,
    				hasClass,
    				activateIndicator: previousIndicatorClientRect => tabIndicator.activate(previousIndicatorClientRect),
    				deactivateIndicator: () => tabIndicator.deactivate(),
    				notifyInteracted: () => dispatch(getElement(), 'MDCTab:interacted', { tabId }),
    				getOffsetLeft: () => getElement().offsetLeft,
    				getOffsetWidth: () => getElement().offsetWidth,
    				getContentOffsetLeft: () => content.offsetLeft,
    				getContentOffsetWidth: () => content.offsetWidth,
    				focus
    			}));

    		const accessor = {
    			tabId,
    			get element() {
    				return getElement();
    			},
    			get active() {
    				return active;
    			},
    			forceAccessible(accessible) {
    				$$invalidate(19, forceAccessible = accessible);
    			},
    			computeIndicatorClientRect: () => tabIndicator.computeContentClientRect(),
    			computeDimensions: () => instance.computeDimensions(),
    			focus,
    			activate,
    			deactivate
    		};

    		dispatch(getElement(), 'SMUI:tab:mount', accessor);
    		instance.init();

    		return () => {
    			dispatch(getElement(), 'SMUI:tab:unmount', accessor);
    			instance.destroy();
    		};
    	});

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(15, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(15, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(16, internalStyles);
    			} else {
    				$$invalidate(16, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function addAttr(name, value) {
    		if (internalAttrs[name] !== value) {
    			$$invalidate(17, internalAttrs[name] = value, internalAttrs);
    		}
    	}

    	function activate(previousIndicatorClientRect, skipFocus) {
    		$$invalidate(18, active = true);

    		if (skipFocus) {
    			instance.setFocusOnActivate(false);
    		}

    		instance.activate(previousIndicatorClientRect);

    		if (skipFocus) {
    			instance.setFocusOnActivate(focusOnActivate);
    		}
    	}

    	function deactivate() {
    		$$invalidate(18, active = false);
    		instance.deactivate();
    	}

    	function focus() {
    		getElement().focus();
    	}

    	function getElement() {
    		return element.getElement();
    	}

    	function tabindicator_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			tabIndicator = $$value;
    			$$invalidate(14, tabIndicator);
    		});
    	}

    	function span0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			content = $$value;
    			$$invalidate(13, content);
    		});
    	}

    	function tabindicator_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			tabIndicator = $$value;
    			$$invalidate(14, tabIndicator);
    		});
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(12, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(24, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(2, style = $$new_props.style);
    		if ('tab' in $$new_props) $$invalidate(25, tabId = $$new_props.tab);
    		if ('ripple' in $$new_props) $$invalidate(3, ripple = $$new_props.ripple);
    		if ('stacked' in $$new_props) $$invalidate(4, stacked = $$new_props.stacked);
    		if ('minWidth' in $$new_props) $$invalidate(5, minWidth = $$new_props.minWidth);
    		if ('indicatorSpanOnlyContent' in $$new_props) $$invalidate(6, indicatorSpanOnlyContent = $$new_props.indicatorSpanOnlyContent);
    		if ('href' in $$new_props) $$invalidate(7, href = $$new_props.href);
    		if ('content$use' in $$new_props) $$invalidate(8, content$use = $$new_props.content$use);
    		if ('content$class' in $$new_props) $$invalidate(9, content$class = $$new_props.content$class);
    		if ('component' in $$new_props) $$invalidate(10, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(35, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCTabFoundation,
    		onMount,
    		setContext,
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		dispatch,
    		Ripple,
    		A,
    		Button,
    		TabIndicator,
    		forwardEvents,
    		use,
    		className,
    		style,
    		tabId,
    		ripple,
    		stacked,
    		minWidth,
    		indicatorSpanOnlyContent,
    		href,
    		content$use,
    		content$class,
    		element,
    		instance,
    		content,
    		tabIndicator,
    		internalClasses,
    		internalStyles,
    		internalAttrs,
    		focusOnActivate,
    		active,
    		forceAccessible,
    		component,
    		hasClass,
    		addClass,
    		removeClass,
    		addStyle,
    		addAttr,
    		activate,
    		deactivate,
    		focus,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(2, style = $$new_props.style);
    		if ('tabId' in $$props) $$invalidate(25, tabId = $$new_props.tabId);
    		if ('ripple' in $$props) $$invalidate(3, ripple = $$new_props.ripple);
    		if ('stacked' in $$props) $$invalidate(4, stacked = $$new_props.stacked);
    		if ('minWidth' in $$props) $$invalidate(5, minWidth = $$new_props.minWidth);
    		if ('indicatorSpanOnlyContent' in $$props) $$invalidate(6, indicatorSpanOnlyContent = $$new_props.indicatorSpanOnlyContent);
    		if ('href' in $$props) $$invalidate(7, href = $$new_props.href);
    		if ('content$use' in $$props) $$invalidate(8, content$use = $$new_props.content$use);
    		if ('content$class' in $$props) $$invalidate(9, content$class = $$new_props.content$class);
    		if ('element' in $$props) $$invalidate(12, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(11, instance = $$new_props.instance);
    		if ('content' in $$props) $$invalidate(13, content = $$new_props.content);
    		if ('tabIndicator' in $$props) $$invalidate(14, tabIndicator = $$new_props.tabIndicator);
    		if ('internalClasses' in $$props) $$invalidate(15, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(16, internalStyles = $$new_props.internalStyles);
    		if ('internalAttrs' in $$props) $$invalidate(17, internalAttrs = $$new_props.internalAttrs);
    		if ('focusOnActivate' in $$props) $$invalidate(36, focusOnActivate = $$new_props.focusOnActivate);
    		if ('active' in $$props) $$invalidate(18, active = $$new_props.active);
    		if ('forceAccessible' in $$props) $$invalidate(19, forceAccessible = $$new_props.forceAccessible);
    		if ('component' in $$props) $$invalidate(10, component = $$new_props.component);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*instance*/ 2048) {
    			if (instance) {
    				instance.setFocusOnActivate(focusOnActivate);
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		style,
    		ripple,
    		stacked,
    		minWidth,
    		indicatorSpanOnlyContent,
    		href,
    		content$use,
    		content$class,
    		component,
    		instance,
    		element,
    		content,
    		tabIndicator,
    		internalClasses,
    		internalStyles,
    		internalAttrs,
    		active,
    		forceAccessible,
    		forwardEvents,
    		addClass,
    		removeClass,
    		addStyle,
    		$$restProps,
    		tabId,
    		activate,
    		deactivate,
    		focus,
    		getElement,
    		slots,
    		tabindicator_binding,
    		span0_binding,
    		tabindicator_binding_1,
    		switch_instance_binding,
    		$$scope
    	];
    }

    class Tab extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1$2,
    			create_fragment$5,
    			safe_not_equal,
    			{
    				use: 0,
    				class: 1,
    				style: 2,
    				tab: 25,
    				ripple: 3,
    				stacked: 4,
    				minWidth: 5,
    				indicatorSpanOnlyContent: 6,
    				href: 7,
    				content$use: 8,
    				content$class: 9,
    				component: 10,
    				activate: 26,
    				deactivate: 27,
    				focus: 28,
    				getElement: 29
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tab",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*tabId*/ ctx[25] === undefined && !('tab' in props)) {
    			console.warn("<Tab> was created without expected prop 'tab'");
    		}
    	}

    	get use() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tab() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tab(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stacked() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stacked(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get minWidth() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set minWidth(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get indicatorSpanOnlyContent() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set indicatorSpanOnlyContent(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content$use() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content$use(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get content$class() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content$class(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error_1("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activate() {
    		return this.$$.ctx[26];
    	}

    	set activate(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get deactivate() {
    		return this.$$.ctx[27];
    	}

    	set deactivate(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focus() {
    		return this.$$.ctx[28];
    	}

    	set focus(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[29];
    	}

    	set getElement(value) {
    		throw new Error_1("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/.pnpm/@smui+common@4.2.0/node_modules/@smui/common/Span.svelte generated by Svelte v3.46.4 */
    const file$3 = "node_modules/.pnpm/@smui+common@4.2.0/node_modules/@smui/common/Span.svelte";

    function create_fragment$4(ctx) {
    	let span;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let span_levels = [/*$$restProps*/ ctx[3]];
    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			set_attributes(span, span_data);
    			add_location(span, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			/*span_binding*/ ctx[7](span);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, span))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(span, span_data = get_spread_update(span_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    			/*span_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Span', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element = null;

    	function getElement() {
    		return element;
    	}

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		span_binding
    	];
    }

    class Span extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$4, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Span",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get use() {
    		throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/.pnpm/@smui+common@4.2.0/node_modules/@smui/common/CommonLabel.svelte generated by Svelte v3.46.4 */

    // (1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-button__label': context === 'button',     'mdc-fab__label': context === 'fab',     'mdc-tab__text-label': context === 'tab',     'mdc-image-list__label': context === 'image-list',     'mdc-snackbar__label': context === 'snackbar',     'mdc-banner__text': context === 'banner',     'mdc-segmented-button__label': context === 'segmented-button',     'mdc-data-table__pagination-rows-per-page-label':       context === 'data-table:pagination',     'mdc-data-table__header-cell-label':       context === 'data-table:sortable-header-cell',   })}   {...context === 'snackbar' ? { 'aria-atomic': 'false' } : {}}   {tabindex}   {...$$restProps}>
    function create_default_slot$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-button__label': context === 'button',     'mdc-fab__label': context === 'fab',     'mdc-tab__text-label': context === 'tab',     'mdc-image-list__label': context === 'image-list',     'mdc-snackbar__label': context === 'snackbar',     'mdc-banner__text': context === 'banner',     'mdc-segmented-button__label': context === 'segmented-button',     'mdc-data-table__pagination-rows-per-page-label':       context === 'data-table:pagination',     'mdc-data-table__header-cell-label':       context === 'data-table:sortable-header-cell',   })}   {...context === 'snackbar' ? { 'aria-atomic': 'false' } : {}}   {tabindex}   {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[4], .../*use*/ ctx[0]]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-button__label': /*context*/ ctx[5] === 'button',
    				'mdc-fab__label': /*context*/ ctx[5] === 'fab',
    				'mdc-tab__text-label': /*context*/ ctx[5] === 'tab',
    				'mdc-image-list__label': /*context*/ ctx[5] === 'image-list',
    				'mdc-snackbar__label': /*context*/ ctx[5] === 'snackbar',
    				'mdc-banner__text': /*context*/ ctx[5] === 'banner',
    				'mdc-segmented-button__label': /*context*/ ctx[5] === 'segmented-button',
    				'mdc-data-table__pagination-rows-per-page-label': /*context*/ ctx[5] === 'data-table:pagination',
    				'mdc-data-table__header-cell-label': /*context*/ ctx[5] === 'data-table:sortable-header-cell'
    			})
    		},
    		/*context*/ ctx[5] === 'snackbar'
    		? { 'aria-atomic': 'false' }
    		: {},
    		{ tabindex: /*tabindex*/ ctx[6] },
    		/*$$restProps*/ ctx[7]
    	];

    	var switch_value = /*component*/ ctx[2];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$2] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		/*switch_instance_binding*/ ctx[10](switch_instance);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = (dirty & /*forwardEvents, use, classMap, className, context, tabindex, $$restProps*/ 243)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*forwardEvents, use*/ 17 && {
    						use: [/*forwardEvents*/ ctx[4], .../*use*/ ctx[0]]
    					},
    					dirty & /*classMap, className, context*/ 34 && {
    						class: classMap({
    							[/*className*/ ctx[1]]: true,
    							'mdc-button__label': /*context*/ ctx[5] === 'button',
    							'mdc-fab__label': /*context*/ ctx[5] === 'fab',
    							'mdc-tab__text-label': /*context*/ ctx[5] === 'tab',
    							'mdc-image-list__label': /*context*/ ctx[5] === 'image-list',
    							'mdc-snackbar__label': /*context*/ ctx[5] === 'snackbar',
    							'mdc-banner__text': /*context*/ ctx[5] === 'banner',
    							'mdc-segmented-button__label': /*context*/ ctx[5] === 'segmented-button',
    							'mdc-data-table__pagination-rows-per-page-label': /*context*/ ctx[5] === 'data-table:pagination',
    							'mdc-data-table__header-cell-label': /*context*/ ctx[5] === 'data-table:sortable-header-cell'
    						})
    					},
    					dirty & /*context*/ 32 && get_spread_object(/*context*/ ctx[5] === 'snackbar'
    					? { 'aria-atomic': 'false' }
    					: {}),
    					dirty & /*tabindex*/ 64 && { tabindex: /*tabindex*/ ctx[6] },
    					dirty & /*$$restProps*/ 128 && get_spread_object(/*$$restProps*/ ctx[7])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2048) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					/*switch_instance_binding*/ ctx[10](switch_instance);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[10](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","component","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CommonLabel', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let element;
    	let { component = Span } = $$props;
    	const context = getContext('SMUI:label:context');
    	const tabindex = getContext('SMUI:label:tabindex');

    	function getElement() {
    		return element.getElement();
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(3, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('component' in $$new_props) $$invalidate(2, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		Span,
    		forwardEvents,
    		use,
    		className,
    		element,
    		component,
    		context,
    		tabindex,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('element' in $$props) $$invalidate(3, element = $$new_props.element);
    		if ('component' in $$props) $$invalidate(2, component = $$new_props.component);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		component,
    		element,
    		forwardEvents,
    		context,
    		tabindex,
    		$$restProps,
    		getElement,
    		slots,
    		switch_instance_binding,
    		$$scope
    	];
    }

    class CommonLabel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$3, safe_not_equal, {
    			use: 0,
    			class: 1,
    			component: 2,
    			getElement: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CommonLabel",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get use() {
    		throw new Error("<CommonLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<CommonLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<CommonLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<CommonLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<CommonLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<CommonLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[8];
    	}

    	set getElement(value) {
    		throw new Error("<CommonLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses = {
        ANIMATING: 'mdc-tab-scroller--animating',
        SCROLL_AREA_SCROLL: 'mdc-tab-scroller__scroll-area--scroll',
        SCROLL_TEST: 'mdc-tab-scroller__test',
    };
    var strings$1 = {
        AREA_SELECTOR: '.mdc-tab-scroller__scroll-area',
        CONTENT_SELECTOR: '.mdc-tab-scroller__scroll-content',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTL = /** @class */ (function () {
        function MDCTabScrollerRTL(adapter) {
            this.adapter = adapter;
        }
        return MDCTabScrollerRTL;
    }());

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTLDefault = /** @class */ (function (_super) {
        __extends(MDCTabScrollerRTLDefault, _super);
        function MDCTabScrollerRTLDefault() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabScrollerRTLDefault.prototype.getScrollPositionRTL = function () {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var right = this.calculateScrollEdges_().right;
            // Scroll values on most browsers are ints instead of floats so we round
            return Math.round(right - currentScrollLeft);
        };
        MDCTabScrollerRTLDefault.prototype.scrollToRTL = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(edges.right - scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLDefault.prototype.incrementScrollRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLDefault.prototype.getAnimatingScrollPosition = function (scrollX) {
            return scrollX;
        };
        MDCTabScrollerRTLDefault.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: 0,
                right: contentWidth - rootWidth,
            };
        };
        MDCTabScrollerRTLDefault.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.min(Math.max(edges.left, scrollX), edges.right);
        };
        return MDCTabScrollerRTLDefault;
    }(MDCTabScrollerRTL));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTLNegative = /** @class */ (function (_super) {
        __extends(MDCTabScrollerRTLNegative, _super);
        function MDCTabScrollerRTLNegative() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabScrollerRTLNegative.prototype.getScrollPositionRTL = function (translateX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            return Math.round(translateX - currentScrollLeft);
        };
        MDCTabScrollerRTLNegative.prototype.scrollToRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(-scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLNegative.prototype.incrementScrollRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: clampedScrollLeft - currentScrollLeft,
            };
        };
        MDCTabScrollerRTLNegative.prototype.getAnimatingScrollPosition = function (scrollX, translateX) {
            return scrollX - translateX;
        };
        MDCTabScrollerRTLNegative.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: rootWidth - contentWidth,
                right: 0,
            };
        };
        MDCTabScrollerRTLNegative.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.max(Math.min(edges.right, scrollX), edges.left);
        };
        return MDCTabScrollerRTLNegative;
    }(MDCTabScrollerRTL));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerRTLReverse = /** @class */ (function (_super) {
        __extends(MDCTabScrollerRTLReverse, _super);
        function MDCTabScrollerRTLReverse() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDCTabScrollerRTLReverse.prototype.getScrollPositionRTL = function (translateX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            // Scroll values on most browsers are ints instead of floats so we round
            return Math.round(currentScrollLeft - translateX);
        };
        MDCTabScrollerRTLReverse.prototype.scrollToRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: currentScrollLeft - clampedScrollLeft,
            };
        };
        MDCTabScrollerRTLReverse.prototype.incrementScrollRTL = function (scrollX) {
            var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
            var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
            return {
                finalScrollPosition: clampedScrollLeft,
                scrollDelta: currentScrollLeft - clampedScrollLeft,
            };
        };
        MDCTabScrollerRTLReverse.prototype.getAnimatingScrollPosition = function (scrollX, translateX) {
            return scrollX + translateX;
        };
        MDCTabScrollerRTLReverse.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: contentWidth - rootWidth,
                right: 0,
            };
        };
        MDCTabScrollerRTLReverse.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.min(Math.max(edges.right, scrollX), edges.left);
        };
        return MDCTabScrollerRTLReverse;
    }(MDCTabScrollerRTL));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCTabScrollerFoundation = /** @class */ (function (_super) {
        __extends(MDCTabScrollerFoundation, _super);
        function MDCTabScrollerFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCTabScrollerFoundation.defaultAdapter), adapter)) || this;
            /**
             * Controls whether we should handle the transitionend and interaction events during the animation.
             */
            _this.isAnimating_ = false;
            return _this;
        }
        Object.defineProperty(MDCTabScrollerFoundation, "cssClasses", {
            get: function () {
                return cssClasses;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabScrollerFoundation, "strings", {
            get: function () {
                return strings$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabScrollerFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    eventTargetMatchesSelector: function () { return false; },
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    addScrollAreaClass: function () { return undefined; },
                    setScrollAreaStyleProperty: function () { return undefined; },
                    setScrollContentStyleProperty: function () { return undefined; },
                    getScrollContentStyleValue: function () { return ''; },
                    setScrollAreaScrollLeft: function () { return undefined; },
                    getScrollAreaScrollLeft: function () { return 0; },
                    getScrollContentOffsetWidth: function () { return 0; },
                    getScrollAreaOffsetWidth: function () { return 0; },
                    computeScrollAreaClientRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    computeScrollContentClientRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    computeHorizontalScrollbarHeight: function () { return 0; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCTabScrollerFoundation.prototype.init = function () {
            // Compute horizontal scrollbar height on scroller with overflow initially hidden, then update overflow to scroll
            // and immediately adjust bottom margin to avoid the scrollbar initially appearing before JS runs.
            var horizontalScrollbarHeight = this.adapter.computeHorizontalScrollbarHeight();
            this.adapter.setScrollAreaStyleProperty('margin-bottom', -horizontalScrollbarHeight + 'px');
            this.adapter.addScrollAreaClass(MDCTabScrollerFoundation.cssClasses.SCROLL_AREA_SCROLL);
        };
        /**
         * Computes the current visual scroll position
         */
        MDCTabScrollerFoundation.prototype.getScrollPosition = function () {
            if (this.isRTL_()) {
                return this.computeCurrentScrollPositionRTL_();
            }
            var currentTranslateX = this.calculateCurrentTranslateX_();
            var scrollLeft = this.adapter.getScrollAreaScrollLeft();
            return scrollLeft - currentTranslateX;
        };
        /**
         * Handles interaction events that occur during transition
         */
        MDCTabScrollerFoundation.prototype.handleInteraction = function () {
            // Early exit if we aren't animating
            if (!this.isAnimating_) {
                return;
            }
            // Prevent other event listeners from handling this event
            this.stopScrollAnimation_();
        };
        /**
         * Handles the transitionend event
         */
        MDCTabScrollerFoundation.prototype.handleTransitionEnd = function (evt) {
            // Early exit if we aren't animating or the event was triggered by a different element.
            var evtTarget = evt.target;
            if (!this.isAnimating_ ||
                !this.adapter.eventTargetMatchesSelector(evtTarget, MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)) {
                return;
            }
            this.isAnimating_ = false;
            this.adapter.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
        };
        /**
         * Increment the scroll value by the scrollXIncrement using animation.
         * @param scrollXIncrement The value by which to increment the scroll position
         */
        MDCTabScrollerFoundation.prototype.incrementScroll = function (scrollXIncrement) {
            // Early exit for non-operational increment values
            if (scrollXIncrement === 0) {
                return;
            }
            this.animate_(this.getIncrementScrollOperation_(scrollXIncrement));
        };
        /**
         * Increment the scroll value by the scrollXIncrement without animation.
         * @param scrollXIncrement The value by which to increment the scroll position
         */
        MDCTabScrollerFoundation.prototype.incrementScrollImmediate = function (scrollXIncrement) {
            // Early exit for non-operational increment values
            if (scrollXIncrement === 0) {
                return;
            }
            var operation = this.getIncrementScrollOperation_(scrollXIncrement);
            if (operation.scrollDelta === 0) {
                return;
            }
            this.stopScrollAnimation_();
            this.adapter.setScrollAreaScrollLeft(operation.finalScrollPosition);
        };
        /**
         * Scrolls to the given scrollX value
         */
        MDCTabScrollerFoundation.prototype.scrollTo = function (scrollX) {
            if (this.isRTL_()) {
                return this.scrollToRTL_(scrollX);
            }
            this.scrollTo_(scrollX);
        };
        /**
         * @return Browser-specific {@link MDCTabScrollerRTL} instance.
         */
        MDCTabScrollerFoundation.prototype.getRTLScroller = function () {
            if (!this.rtlScrollerInstance_) {
                this.rtlScrollerInstance_ = this.rtlScrollerFactory_();
            }
            return this.rtlScrollerInstance_;
        };
        /**
         * @return translateX value from a CSS matrix transform function string.
         */
        MDCTabScrollerFoundation.prototype.calculateCurrentTranslateX_ = function () {
            var transformValue = this.adapter.getScrollContentStyleValue('transform');
            // Early exit if no transform is present
            if (transformValue === 'none') {
                return 0;
            }
            // The transform value comes back as a matrix transformation in the form
            // of `matrix(a, b, c, d, tx, ty)`. We only care about tx (translateX) so
            // we're going to grab all the parenthesized values, strip out tx, and
            // parse it.
            var match = /\((.+?)\)/.exec(transformValue);
            if (!match) {
                return 0;
            }
            var matrixParams = match[1];
            // tslint:disable-next-line:ban-ts-ignore "Unused vars" should be a linter warning, not a compiler error.
            // @ts-ignore These unused variables should retain their semantic names for clarity.
            var _a = __read(matrixParams.split(','), 6); _a[0]; _a[1]; _a[2]; _a[3]; var tx = _a[4]; _a[5];
            return parseFloat(tx); // tslint:disable-line:ban
        };
        /**
         * Calculates a safe scroll value that is > 0 and < the max scroll value
         * @param scrollX The distance to scroll
         */
        MDCTabScrollerFoundation.prototype.clampScrollValue_ = function (scrollX) {
            var edges = this.calculateScrollEdges_();
            return Math.min(Math.max(edges.left, scrollX), edges.right);
        };
        MDCTabScrollerFoundation.prototype.computeCurrentScrollPositionRTL_ = function () {
            var translateX = this.calculateCurrentTranslateX_();
            return this.getRTLScroller().getScrollPositionRTL(translateX);
        };
        MDCTabScrollerFoundation.prototype.calculateScrollEdges_ = function () {
            var contentWidth = this.adapter.getScrollContentOffsetWidth();
            var rootWidth = this.adapter.getScrollAreaOffsetWidth();
            return {
                left: 0,
                right: contentWidth - rootWidth,
            };
        };
        /**
         * Internal scroll method
         * @param scrollX The new scroll position
         */
        MDCTabScrollerFoundation.prototype.scrollTo_ = function (scrollX) {
            var currentScrollX = this.getScrollPosition();
            var safeScrollX = this.clampScrollValue_(scrollX);
            var scrollDelta = safeScrollX - currentScrollX;
            this.animate_({
                finalScrollPosition: safeScrollX,
                scrollDelta: scrollDelta,
            });
        };
        /**
         * Internal RTL scroll method
         * @param scrollX The new scroll position
         */
        MDCTabScrollerFoundation.prototype.scrollToRTL_ = function (scrollX) {
            var animation = this.getRTLScroller().scrollToRTL(scrollX);
            this.animate_(animation);
        };
        /**
         * Internal method to compute the increment scroll operation values.
         * @param scrollX The desired scroll position increment
         * @return MDCTabScrollerAnimation with the sanitized values for performing the scroll operation.
         */
        MDCTabScrollerFoundation.prototype.getIncrementScrollOperation_ = function (scrollX) {
            if (this.isRTL_()) {
                return this.getRTLScroller().incrementScrollRTL(scrollX);
            }
            var currentScrollX = this.getScrollPosition();
            var targetScrollX = scrollX + currentScrollX;
            var safeScrollX = this.clampScrollValue_(targetScrollX);
            var scrollDelta = safeScrollX - currentScrollX;
            return {
                finalScrollPosition: safeScrollX,
                scrollDelta: scrollDelta,
            };
        };
        /**
         * Animates the tab scrolling
         * @param animation The animation to apply
         */
        MDCTabScrollerFoundation.prototype.animate_ = function (animation) {
            var _this = this;
            // Early exit if translateX is 0, which means there's no animation to perform
            if (animation.scrollDelta === 0) {
                return;
            }
            this.stopScrollAnimation_();
            // This animation uses the FLIP approach.
            // Read more here: https://aerotwist.com/blog/flip-your-animations/
            this.adapter.setScrollAreaScrollLeft(animation.finalScrollPosition);
            this.adapter.setScrollContentStyleProperty('transform', "translateX(" + animation.scrollDelta + "px)");
            // Force repaint
            this.adapter.computeScrollAreaClientRect();
            requestAnimationFrame(function () {
                _this.adapter.addClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
                _this.adapter.setScrollContentStyleProperty('transform', 'none');
            });
            this.isAnimating_ = true;
        };
        /**
         * Stops scroll animation
         */
        MDCTabScrollerFoundation.prototype.stopScrollAnimation_ = function () {
            this.isAnimating_ = false;
            var currentScrollPosition = this.getAnimatingScrollPosition_();
            this.adapter.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
            this.adapter.setScrollContentStyleProperty('transform', 'translateX(0px)');
            this.adapter.setScrollAreaScrollLeft(currentScrollPosition);
        };
        /**
         * Gets the current scroll position during animation
         */
        MDCTabScrollerFoundation.prototype.getAnimatingScrollPosition_ = function () {
            var currentTranslateX = this.calculateCurrentTranslateX_();
            var scrollLeft = this.adapter.getScrollAreaScrollLeft();
            if (this.isRTL_()) {
                return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
            }
            return scrollLeft - currentTranslateX;
        };
        /**
         * Determines the RTL Scroller to use
         */
        MDCTabScrollerFoundation.prototype.rtlScrollerFactory_ = function () {
            // Browsers have three different implementations of scrollLeft in RTL mode,
            // dependent on the browser. The behavior is based off the max LTR
            // scrollLeft value and 0.
            //
            // * Default scrolling in RTL *
            //    - Left-most value: 0
            //    - Right-most value: Max LTR scrollLeft value
            //
            // * Negative scrolling in RTL *
            //    - Left-most value: Negated max LTR scrollLeft value
            //    - Right-most value: 0
            //
            // * Reverse scrolling in RTL *
            //    - Left-most value: Max LTR scrollLeft value
            //    - Right-most value: 0
            //
            // We use those principles below to determine which RTL scrollLeft
            // behavior is implemented in the current browser.
            var initialScrollLeft = this.adapter.getScrollAreaScrollLeft();
            this.adapter.setScrollAreaScrollLeft(initialScrollLeft - 1);
            var newScrollLeft = this.adapter.getScrollAreaScrollLeft();
            // If the newScrollLeft value is negative,then we know that the browser has
            // implemented negative RTL scrolling, since all other implementations have
            // only positive values.
            if (newScrollLeft < 0) {
                // Undo the scrollLeft test check
                this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
                return new MDCTabScrollerRTLNegative(this.adapter);
            }
            var rootClientRect = this.adapter.computeScrollAreaClientRect();
            var contentClientRect = this.adapter.computeScrollContentClientRect();
            var rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right);
            // Undo the scrollLeft test check
            this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
            // By calculating the clientRect of the root element and the clientRect of
            // the content element, we can determine how much the scroll value changed
            // when we performed the scrollLeft subtraction above.
            if (rightEdgeDelta === newScrollLeft) {
                return new MDCTabScrollerRTLReverse(this.adapter);
            }
            return new MDCTabScrollerRTLDefault(this.adapter);
        };
        MDCTabScrollerFoundation.prototype.isRTL_ = function () {
            return this.adapter.getScrollContentStyleValue('direction') === 'rtl';
        };
        return MDCTabScrollerFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Stores result from computeHorizontalScrollbarHeight to avoid redundant processing.
     */
    var horizontalScrollbarHeight_;
    /**
     * Computes the height of browser-rendered horizontal scrollbars using a self-created test element.
     * May return 0 (e.g. on OS X browsers under default configuration).
     */
    function computeHorizontalScrollbarHeight(documentObj, shouldCacheResult) {
        if (shouldCacheResult === void 0) { shouldCacheResult = true; }
        if (shouldCacheResult && typeof horizontalScrollbarHeight_ !== 'undefined') {
            return horizontalScrollbarHeight_;
        }
        var el = documentObj.createElement('div');
        el.classList.add(cssClasses.SCROLL_TEST);
        documentObj.body.appendChild(el);
        var horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
        documentObj.body.removeChild(el);
        if (shouldCacheResult) {
            horizontalScrollbarHeight_ = horizontalScrollbarHeight;
        }
        return horizontalScrollbarHeight;
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        computeHorizontalScrollbarHeight: computeHorizontalScrollbarHeight
    });

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings = {
        ARROW_LEFT_KEY: 'ArrowLeft',
        ARROW_RIGHT_KEY: 'ArrowRight',
        END_KEY: 'End',
        ENTER_KEY: 'Enter',
        HOME_KEY: 'Home',
        SPACE_KEY: 'Space',
        TAB_ACTIVATED_EVENT: 'MDCTabBar:activated',
        TAB_SCROLLER_SELECTOR: '.mdc-tab-scroller',
        TAB_SELECTOR: '.mdc-tab',
    };
    var numbers = {
        ARROW_LEFT_KEYCODE: 37,
        ARROW_RIGHT_KEYCODE: 39,
        END_KEYCODE: 35,
        ENTER_KEYCODE: 13,
        EXTRA_SCROLL_AMOUNT: 20,
        HOME_KEYCODE: 36,
        SPACE_KEYCODE: 32,
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var ACCEPTABLE_KEYS = new Set();
    // IE11 has no support for new Set with iterable so we need to initialize this by hand
    ACCEPTABLE_KEYS.add(strings.ARROW_LEFT_KEY);
    ACCEPTABLE_KEYS.add(strings.ARROW_RIGHT_KEY);
    ACCEPTABLE_KEYS.add(strings.END_KEY);
    ACCEPTABLE_KEYS.add(strings.HOME_KEY);
    ACCEPTABLE_KEYS.add(strings.ENTER_KEY);
    ACCEPTABLE_KEYS.add(strings.SPACE_KEY);
    var KEYCODE_MAP = new Map();
    // IE11 has no support for new Map with iterable so we need to initialize this by hand
    KEYCODE_MAP.set(numbers.ARROW_LEFT_KEYCODE, strings.ARROW_LEFT_KEY);
    KEYCODE_MAP.set(numbers.ARROW_RIGHT_KEYCODE, strings.ARROW_RIGHT_KEY);
    KEYCODE_MAP.set(numbers.END_KEYCODE, strings.END_KEY);
    KEYCODE_MAP.set(numbers.HOME_KEYCODE, strings.HOME_KEY);
    KEYCODE_MAP.set(numbers.ENTER_KEYCODE, strings.ENTER_KEY);
    KEYCODE_MAP.set(numbers.SPACE_KEYCODE, strings.SPACE_KEY);
    var MDCTabBarFoundation = /** @class */ (function (_super) {
        __extends(MDCTabBarFoundation, _super);
        function MDCTabBarFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCTabBarFoundation.defaultAdapter), adapter)) || this;
            _this.useAutomaticActivation_ = false;
            return _this;
        }
        Object.defineProperty(MDCTabBarFoundation, "strings", {
            get: function () {
                return strings;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabBarFoundation, "numbers", {
            get: function () {
                return numbers;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTabBarFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    scrollTo: function () { return undefined; },
                    incrementScroll: function () { return undefined; },
                    getScrollPosition: function () { return 0; },
                    getScrollContentWidth: function () { return 0; },
                    getOffsetWidth: function () { return 0; },
                    isRTL: function () { return false; },
                    setActiveTab: function () { return undefined; },
                    activateTabAtIndex: function () { return undefined; },
                    deactivateTabAtIndex: function () { return undefined; },
                    focusTabAtIndex: function () { return undefined; },
                    getTabIndicatorClientRectAtIndex: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                    getTabDimensionsAtIndex: function () { return ({ rootLeft: 0, rootRight: 0, contentLeft: 0, contentRight: 0 }); },
                    getPreviousActiveTabIndex: function () { return -1; },
                    getFocusedTabIndex: function () { return -1; },
                    getIndexOfTabById: function () { return -1; },
                    getTabListLength: function () { return 0; },
                    notifyTabActivated: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Switches between automatic and manual activation modes.
         * See https://www.w3.org/TR/wai-aria-practices/#tabpanel for examples.
         */
        MDCTabBarFoundation.prototype.setUseAutomaticActivation = function (useAutomaticActivation) {
            this.useAutomaticActivation_ = useAutomaticActivation;
        };
        MDCTabBarFoundation.prototype.activateTab = function (index) {
            var previousActiveIndex = this.adapter.getPreviousActiveTabIndex();
            if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
                return;
            }
            var previousClientRect;
            if (previousActiveIndex !== -1) {
                this.adapter.deactivateTabAtIndex(previousActiveIndex);
                previousClientRect =
                    this.adapter.getTabIndicatorClientRectAtIndex(previousActiveIndex);
            }
            this.adapter.activateTabAtIndex(index, previousClientRect);
            this.scrollIntoView(index);
            this.adapter.notifyTabActivated(index);
        };
        MDCTabBarFoundation.prototype.handleKeyDown = function (evt) {
            // Get the key from the event
            var key = this.getKeyFromEvent_(evt);
            // Early exit if the event key isn't one of the keyboard navigation keys
            if (key === undefined) {
                return;
            }
            // Prevent default behavior for movement keys, but not for activation keys, since :active is used to apply ripple
            if (!this.isActivationKey_(key)) {
                evt.preventDefault();
            }
            if (this.useAutomaticActivation_) {
                if (this.isActivationKey_(key)) {
                    return;
                }
                var index = this.determineTargetFromKey_(this.adapter.getPreviousActiveTabIndex(), key);
                this.adapter.setActiveTab(index);
                this.scrollIntoView(index);
            }
            else {
                var focusedTabIndex = this.adapter.getFocusedTabIndex();
                if (this.isActivationKey_(key)) {
                    this.adapter.setActiveTab(focusedTabIndex);
                }
                else {
                    var index = this.determineTargetFromKey_(focusedTabIndex, key);
                    this.adapter.focusTabAtIndex(index);
                    this.scrollIntoView(index);
                }
            }
        };
        /**
         * Handles the MDCTab:interacted event
         */
        MDCTabBarFoundation.prototype.handleTabInteraction = function (evt) {
            this.adapter.setActiveTab(this.adapter.getIndexOfTabById(evt.detail.tabId));
        };
        /**
         * Scrolls the tab at the given index into view
         * @param index The tab index to make visible
         */
        MDCTabBarFoundation.prototype.scrollIntoView = function (index) {
            // Early exit if the index is out of range
            if (!this.indexIsInRange_(index)) {
                return;
            }
            // Always scroll to 0 if scrolling to the 0th index
            if (index === 0) {
                return this.adapter.scrollTo(0);
            }
            // Always scroll to the max value if scrolling to the Nth index
            // MDCTabScroller.scrollTo() will never scroll past the max possible value
            if (index === this.adapter.getTabListLength() - 1) {
                return this.adapter.scrollTo(this.adapter.getScrollContentWidth());
            }
            if (this.isRTL_()) {
                return this.scrollIntoViewRTL_(index);
            }
            this.scrollIntoView_(index);
        };
        /**
         * Private method for determining the index of the destination tab based on what key was pressed
         * @param origin The original index from which to determine the destination
         * @param key The name of the key
         */
        MDCTabBarFoundation.prototype.determineTargetFromKey_ = function (origin, key) {
            var isRTL = this.isRTL_();
            var maxIndex = this.adapter.getTabListLength() - 1;
            var shouldGoToEnd = key === strings.END_KEY;
            var shouldDecrement = key === strings.ARROW_LEFT_KEY && !isRTL || key === strings.ARROW_RIGHT_KEY && isRTL;
            var shouldIncrement = key === strings.ARROW_RIGHT_KEY && !isRTL || key === strings.ARROW_LEFT_KEY && isRTL;
            var index = origin;
            if (shouldGoToEnd) {
                index = maxIndex;
            }
            else if (shouldDecrement) {
                index -= 1;
            }
            else if (shouldIncrement) {
                index += 1;
            }
            else {
                index = 0;
            }
            if (index < 0) {
                index = maxIndex;
            }
            else if (index > maxIndex) {
                index = 0;
            }
            return index;
        };
        /**
         * Calculates the scroll increment that will make the tab at the given index visible
         * @param index The index of the tab
         * @param nextIndex The index of the next tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the Tab Bar
         */
        MDCTabBarFoundation.prototype.calculateScrollIncrement_ = function (index, nextIndex, scrollPosition, barWidth) {
            var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
            var relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
            var relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
            var leftIncrement = relativeContentRight - numbers.EXTRA_SCROLL_AMOUNT;
            var rightIncrement = relativeContentLeft + numbers.EXTRA_SCROLL_AMOUNT;
            if (nextIndex < index) {
                return Math.min(leftIncrement, 0);
            }
            return Math.max(rightIncrement, 0);
        };
        /**
         * Calculates the scroll increment that will make the tab at the given index visible in RTL
         * @param index The index of the tab
         * @param nextIndex The index of the next tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the Tab Bar
         * @param scrollContentWidth The width of the scroll content
         */
        MDCTabBarFoundation.prototype.calculateScrollIncrementRTL_ = function (index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
            var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
            var relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
            var relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
            var leftIncrement = relativeContentRight + numbers.EXTRA_SCROLL_AMOUNT;
            var rightIncrement = relativeContentLeft - numbers.EXTRA_SCROLL_AMOUNT;
            if (nextIndex > index) {
                return Math.max(leftIncrement, 0);
            }
            return Math.min(rightIncrement, 0);
        };
        /**
         * Determines the index of the adjacent tab closest to either edge of the Tab Bar
         * @param index The index of the tab
         * @param tabDimensions The dimensions of the tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the tab bar
         */
        MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdge_ = function (index, tabDimensions, scrollPosition, barWidth) {
            /**
             * Tabs are laid out in the Tab Scroller like this:
             *
             *    Scroll Position
             *    +---+
             *    |   |   Bar Width
             *    |   +-----------------------------------+
             *    |   |                                   |
             *    |   V                                   V
             *    |   +-----------------------------------+
             *    V   |             Tab Scroller          |
             *    +------------+--------------+-------------------+
             *    |    Tab     |      Tab     |        Tab        |
             *    +------------+--------------+-------------------+
             *        |                                   |
             *        +-----------------------------------+
             *
             * To determine the next adjacent index, we look at the Tab root left and
             * Tab root right, both relative to the scroll position. If the Tab root
             * left is less than 0, then we know it's out of view to the left. If the
             * Tab root right minus the bar width is greater than 0, we know the Tab is
             * out of view to the right. From there, we either increment or decrement
             * the index.
             */
            var relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
            var relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
            var relativeRootDelta = relativeRootLeft + relativeRootRight;
            var leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
            var rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;
            if (leftEdgeIsCloser) {
                return index - 1;
            }
            if (rightEdgeIsCloser) {
                return index + 1;
            }
            return -1;
        };
        /**
         * Determines the index of the adjacent tab closest to either edge of the Tab Bar in RTL
         * @param index The index of the tab
         * @param tabDimensions The dimensions of the tab
         * @param scrollPosition The current scroll position
         * @param barWidth The width of the tab bar
         * @param scrollContentWidth The width of the scroller content
         */
        MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdgeRTL_ = function (index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
            var rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
            var rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
            var rootDelta = rootLeft + rootRight;
            var leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
            var rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;
            if (leftEdgeIsCloser) {
                return index + 1;
            }
            if (rightEdgeIsCloser) {
                return index - 1;
            }
            return -1;
        };
        /**
         * Returns the key associated with a keydown event
         * @param evt The keydown event
         */
        MDCTabBarFoundation.prototype.getKeyFromEvent_ = function (evt) {
            if (ACCEPTABLE_KEYS.has(evt.key)) {
                return evt.key;
            }
            return KEYCODE_MAP.get(evt.keyCode);
        };
        MDCTabBarFoundation.prototype.isActivationKey_ = function (key) {
            return key === strings.SPACE_KEY || key === strings.ENTER_KEY;
        };
        /**
         * Returns whether a given index is inclusively between the ends
         * @param index The index to test
         */
        MDCTabBarFoundation.prototype.indexIsInRange_ = function (index) {
            return index >= 0 && index < this.adapter.getTabListLength();
        };
        /**
         * Returns the view's RTL property
         */
        MDCTabBarFoundation.prototype.isRTL_ = function () {
            return this.adapter.isRTL();
        };
        /**
         * Scrolls the tab at the given index into view for left-to-right user agents.
         * @param index The index of the tab to scroll into view
         */
        MDCTabBarFoundation.prototype.scrollIntoView_ = function (index) {
            var scrollPosition = this.adapter.getScrollPosition();
            var barWidth = this.adapter.getOffsetWidth();
            var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
            var nextIndex = this.findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth);
            if (!this.indexIsInRange_(nextIndex)) {
                return;
            }
            var scrollIncrement = this.calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth);
            this.adapter.incrementScroll(scrollIncrement);
        };
        /**
         * Scrolls the tab at the given index into view in RTL
         * @param index The tab index to make visible
         */
        MDCTabBarFoundation.prototype.scrollIntoViewRTL_ = function (index) {
            var scrollPosition = this.adapter.getScrollPosition();
            var barWidth = this.adapter.getOffsetWidth();
            var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
            var scrollWidth = this.adapter.getScrollContentWidth();
            var nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollWidth);
            if (!this.indexIsInRange_(nextIndex)) {
                return;
            }
            var scrollIncrement = this.calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollWidth);
            this.adapter.incrementScroll(scrollIncrement);
        };
        return MDCTabBarFoundation;
    }(MDCFoundation));

    /* node_modules/.pnpm/@smui+tab-scroller@4.2.0/node_modules/@smui/tab-scroller/TabScroller.svelte generated by Svelte v3.46.4 */

    const file$2 = "node_modules/.pnpm/@smui+tab-scroller@4.2.0/node_modules/@smui/tab-scroller/TabScroller.svelte";

    function create_fragment$2(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let div0_class_value;
    	let div0_style_value;
    	let useActions_action;
    	let div1_class_value;
    	let div1_style_value;
    	let useActions_action_1;
    	let div2_class_value;
    	let useActions_action_2;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[23].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[22], null);

    	let div0_levels = [
    		{
    			class: div0_class_value = classMap({
    				[/*scrollContent$class*/ ctx[6]]: true,
    				'mdc-tab-scroller__scroll-content': true
    			})
    		},
    		{
    			style: div0_style_value = Object.entries(/*scrollContentStyles*/ ctx[14]).map(func).join(' ')
    		},
    		prefixFilter(/*$$restProps*/ ctx[16], 'scrollContent$')
    	];

    	let div0_data = {};

    	for (let i = 0; i < div0_levels.length; i += 1) {
    		div0_data = assign(div0_data, div0_levels[i]);
    	}

    	let div1_levels = [
    		{
    			class: div1_class_value = classMap({
    				[/*scrollArea$class*/ ctx[4]]: true,
    				'mdc-tab-scroller__scroll-area': true,
    				.../*scrollAreaClasses*/ ctx[12]
    			})
    		},
    		{
    			style: div1_style_value = Object.entries(/*scrollAreaStyles*/ ctx[13]).map(func_1).join(' ')
    		},
    		prefixFilter(/*$$restProps*/ ctx[16], 'scrollArea$')
    	];

    	let div1_data = {};

    	for (let i = 0; i < div1_levels.length; i += 1) {
    		div1_data = assign(div1_data, div1_levels[i]);
    	}

    	let div2_levels = [
    		{
    			class: div2_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-tab-scroller': true,
    				'mdc-tab-scroller--align-start': /*align*/ ctx[2] === 'start',
    				'mdc-tab-scroller--align-end': /*align*/ ctx[2] === 'end',
    				'mdc-tab-scroller--align-center': /*align*/ ctx[2] === 'center',
    				.../*internalClasses*/ ctx[11]
    			})
    		},
    		exclude(/*$$restProps*/ ctx[16], ['scrollArea$', 'scrollContent$'])
    	];

    	let div2_data = {};

    	for (let i = 0; i < div2_levels.length; i += 1) {
    		div2_data = assign(div2_data, div2_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div0, div0_data);
    			add_location(div0, file$2, 32, 4, 1108);
    			set_attributes(div1, div1_data);
    			add_location(div1, file$2, 14, 2, 406);
    			set_attributes(div2, div2_data);
    			add_location(div2, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[24](div0);
    			/*div1_binding*/ ctx[26](div1);
    			/*div2_binding*/ ctx[32](div2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, div0, /*scrollContent$use*/ ctx[5])),
    					listen_dev(div0, "transitionend", /*transitionend_handler*/ ctx[25], false, false, false),
    					action_destroyer(useActions_action_1 = useActions.call(null, div1, /*scrollArea$use*/ ctx[3])),
    					listen_dev(div1, "wheel", /*wheel_handler*/ ctx[27], { passive: true }, false, false),
    					listen_dev(div1, "touchstart", /*touchstart_handler*/ ctx[28], { passive: true }, false, false),
    					listen_dev(div1, "pointerdown", /*pointerdown_handler*/ ctx[29], false, false, false),
    					listen_dev(div1, "mousedown", /*mousedown_handler*/ ctx[30], false, false, false),
    					listen_dev(div1, "keydown", /*keydown_handler*/ ctx[31], false, false, false),
    					action_destroyer(useActions_action_2 = useActions.call(null, div2, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[15].call(null, div2))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 4194304)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[22],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[22])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[22], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div0, div0_data = get_spread_update(div0_levels, [
    				(!current || dirty[0] & /*scrollContent$class*/ 64 && div0_class_value !== (div0_class_value = classMap({
    					[/*scrollContent$class*/ ctx[6]]: true,
    					'mdc-tab-scroller__scroll-content': true
    				}))) && { class: div0_class_value },
    				(!current || dirty[0] & /*scrollContentStyles*/ 16384 && div0_style_value !== (div0_style_value = Object.entries(/*scrollContentStyles*/ ctx[14]).map(func).join(' '))) && { style: div0_style_value },
    				dirty[0] & /*$$restProps*/ 65536 && prefixFilter(/*$$restProps*/ ctx[16], 'scrollContent$')
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*scrollContent$use*/ 32) useActions_action.update.call(null, /*scrollContent$use*/ ctx[5]);

    			set_attributes(div1, div1_data = get_spread_update(div1_levels, [
    				(!current || dirty[0] & /*scrollArea$class, scrollAreaClasses*/ 4112 && div1_class_value !== (div1_class_value = classMap({
    					[/*scrollArea$class*/ ctx[4]]: true,
    					'mdc-tab-scroller__scroll-area': true,
    					.../*scrollAreaClasses*/ ctx[12]
    				}))) && { class: div1_class_value },
    				(!current || dirty[0] & /*scrollAreaStyles*/ 8192 && div1_style_value !== (div1_style_value = Object.entries(/*scrollAreaStyles*/ ctx[13]).map(func_1).join(' '))) && { style: div1_style_value },
    				dirty[0] & /*$$restProps*/ 65536 && prefixFilter(/*$$restProps*/ ctx[16], 'scrollArea$')
    			]));

    			if (useActions_action_1 && is_function(useActions_action_1.update) && dirty[0] & /*scrollArea$use*/ 8) useActions_action_1.update.call(null, /*scrollArea$use*/ ctx[3]);

    			set_attributes(div2, div2_data = get_spread_update(div2_levels, [
    				(!current || dirty[0] & /*className, align, internalClasses*/ 2054 && div2_class_value !== (div2_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-tab-scroller': true,
    					'mdc-tab-scroller--align-start': /*align*/ ctx[2] === 'start',
    					'mdc-tab-scroller--align-end': /*align*/ ctx[2] === 'end',
    					'mdc-tab-scroller--align-center': /*align*/ ctx[2] === 'center',
    					.../*internalClasses*/ ctx[11]
    				}))) && { class: div2_class_value },
    				dirty[0] & /*$$restProps*/ 65536 && exclude(/*$$restProps*/ ctx[16], ['scrollArea$', 'scrollContent$'])
    			]));

    			if (useActions_action_2 && is_function(useActions_action_2.update) && dirty[0] & /*use*/ 1) useActions_action_2.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[24](null);
    			/*div1_binding*/ ctx[26](null);
    			/*div2_binding*/ ctx[32](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = ([name, value]) => `${name}: ${value};`;
    const func_1 = ([name, value]) => `${name}: ${value};`;

    function instance_1$1($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","align","scrollArea$use","scrollArea$class","scrollContent$use","scrollContent$class","getScrollPosition","getScrollContentWidth","incrementScroll","scrollTo","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TabScroller', slots, ['default']);
    	const { matches } = ponyfill;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { align = null } = $$props;
    	let { scrollArea$use = [] } = $$props;
    	let { scrollArea$class = '' } = $$props;
    	let { scrollContent$use = [] } = $$props;
    	let { scrollContent$class = '' } = $$props;
    	let element;
    	let instance;
    	let scrollArea;
    	let scrollContent;
    	let internalClasses = {};
    	let scrollAreaClasses = {};
    	let scrollAreaStyles = {};
    	let scrollContentStyles = {};

    	onMount(() => {
    		$$invalidate(8, instance = new MDCTabScrollerFoundation({
    				eventTargetMatchesSelector: (evtTarget, selector) => matches(evtTarget, selector),
    				addClass,
    				removeClass,
    				addScrollAreaClass,
    				setScrollAreaStyleProperty: addScrollAreaStyle,
    				setScrollContentStyleProperty: addScrollContentStyle,
    				getScrollContentStyleValue: getScrollContentStyle,
    				setScrollAreaScrollLeft: scrollX => $$invalidate(9, scrollArea.scrollLeft = scrollX, scrollArea),
    				getScrollAreaScrollLeft: () => scrollArea.scrollLeft,
    				getScrollContentOffsetWidth: () => scrollContent.offsetWidth,
    				getScrollAreaOffsetWidth: () => scrollArea.offsetWidth,
    				computeScrollAreaClientRect: () => scrollArea.getBoundingClientRect(),
    				computeScrollContentClientRect: () => scrollContent.getBoundingClientRect(),
    				computeHorizontalScrollbarHeight: () => computeHorizontalScrollbarHeight(document)
    			}));

    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(11, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(11, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addScrollAreaClass(className) {
    		if (!scrollAreaClasses[className]) {
    			$$invalidate(12, scrollAreaClasses[className] = true, scrollAreaClasses);
    		}
    	}

    	function addScrollAreaStyle(name, value) {
    		if (scrollAreaStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete scrollAreaStyles[name];
    				$$invalidate(13, scrollAreaStyles);
    			} else {
    				$$invalidate(13, scrollAreaStyles[name] = value, scrollAreaStyles);
    			}
    		}
    	}

    	function addScrollContentStyle(name, value) {
    		if (scrollContentStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete scrollContentStyles[name];
    				$$invalidate(14, scrollContentStyles);
    			} else {
    				$$invalidate(14, scrollContentStyles[name] = value, scrollContentStyles);
    			}
    		}
    	}

    	function getScrollContentStyle(name) {
    		return name in scrollContentStyles
    		? scrollContentStyles[name]
    		: getComputedStyle(scrollContent).getPropertyValue(name);
    	}

    	function getScrollPosition() {
    		return instance.getScrollPosition();
    	}

    	function getScrollContentWidth() {
    		return scrollContent.offsetWidth;
    	}

    	function incrementScroll(scrollXIncrement) {
    		instance.incrementScroll(scrollXIncrement);
    	}

    	function scrollTo(scrollX) {
    		instance.scrollTo(scrollX);
    	}

    	function getElement() {
    		return element;
    	}

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			scrollContent = $$value;
    			$$invalidate(10, scrollContent);
    		});
    	}

    	const transitionend_handler = event => instance && instance.handleTransitionEnd(event);

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			scrollArea = $$value;
    			$$invalidate(9, scrollArea);
    		});
    	}

    	const wheel_handler = () => instance && instance.handleInteraction();
    	const touchstart_handler = () => instance && instance.handleInteraction();
    	const pointerdown_handler = () => instance && instance.handleInteraction();
    	const mousedown_handler = () => instance && instance.handleInteraction();
    	const keydown_handler = () => instance && instance.handleInteraction();

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(7, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(16, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('align' in $$new_props) $$invalidate(2, align = $$new_props.align);
    		if ('scrollArea$use' in $$new_props) $$invalidate(3, scrollArea$use = $$new_props.scrollArea$use);
    		if ('scrollArea$class' in $$new_props) $$invalidate(4, scrollArea$class = $$new_props.scrollArea$class);
    		if ('scrollContent$use' in $$new_props) $$invalidate(5, scrollContent$use = $$new_props.scrollContent$use);
    		if ('scrollContent$class' in $$new_props) $$invalidate(6, scrollContent$class = $$new_props.scrollContent$class);
    		if ('$$scope' in $$new_props) $$invalidate(22, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCTabScrollerFoundation,
    		util,
    		ponyfill,
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		matches,
    		forwardEvents,
    		use,
    		className,
    		align,
    		scrollArea$use,
    		scrollArea$class,
    		scrollContent$use,
    		scrollContent$class,
    		element,
    		instance,
    		scrollArea,
    		scrollContent,
    		internalClasses,
    		scrollAreaClasses,
    		scrollAreaStyles,
    		scrollContentStyles,
    		addClass,
    		removeClass,
    		addScrollAreaClass,
    		addScrollAreaStyle,
    		addScrollContentStyle,
    		getScrollContentStyle,
    		getScrollPosition,
    		getScrollContentWidth,
    		incrementScroll,
    		scrollTo,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('align' in $$props) $$invalidate(2, align = $$new_props.align);
    		if ('scrollArea$use' in $$props) $$invalidate(3, scrollArea$use = $$new_props.scrollArea$use);
    		if ('scrollArea$class' in $$props) $$invalidate(4, scrollArea$class = $$new_props.scrollArea$class);
    		if ('scrollContent$use' in $$props) $$invalidate(5, scrollContent$use = $$new_props.scrollContent$use);
    		if ('scrollContent$class' in $$props) $$invalidate(6, scrollContent$class = $$new_props.scrollContent$class);
    		if ('element' in $$props) $$invalidate(7, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(8, instance = $$new_props.instance);
    		if ('scrollArea' in $$props) $$invalidate(9, scrollArea = $$new_props.scrollArea);
    		if ('scrollContent' in $$props) $$invalidate(10, scrollContent = $$new_props.scrollContent);
    		if ('internalClasses' in $$props) $$invalidate(11, internalClasses = $$new_props.internalClasses);
    		if ('scrollAreaClasses' in $$props) $$invalidate(12, scrollAreaClasses = $$new_props.scrollAreaClasses);
    		if ('scrollAreaStyles' in $$props) $$invalidate(13, scrollAreaStyles = $$new_props.scrollAreaStyles);
    		if ('scrollContentStyles' in $$props) $$invalidate(14, scrollContentStyles = $$new_props.scrollContentStyles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		align,
    		scrollArea$use,
    		scrollArea$class,
    		scrollContent$use,
    		scrollContent$class,
    		element,
    		instance,
    		scrollArea,
    		scrollContent,
    		internalClasses,
    		scrollAreaClasses,
    		scrollAreaStyles,
    		scrollContentStyles,
    		forwardEvents,
    		$$restProps,
    		getScrollPosition,
    		getScrollContentWidth,
    		incrementScroll,
    		scrollTo,
    		getElement,
    		$$scope,
    		slots,
    		div0_binding,
    		transitionend_handler,
    		div1_binding,
    		wheel_handler,
    		touchstart_handler,
    		pointerdown_handler,
    		mousedown_handler,
    		keydown_handler,
    		div2_binding
    	];
    }

    class TabScroller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1$1,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				use: 0,
    				class: 1,
    				align: 2,
    				scrollArea$use: 3,
    				scrollArea$class: 4,
    				scrollContent$use: 5,
    				scrollContent$class: 6,
    				getScrollPosition: 17,
    				getScrollContentWidth: 18,
    				incrementScroll: 19,
    				scrollTo: 20,
    				getElement: 21
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TabScroller",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get use() {
    		throw new Error("<TabScroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<TabScroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<TabScroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollArea$use() {
    		throw new Error("<TabScroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scrollArea$use(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollArea$class() {
    		throw new Error("<TabScroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scrollArea$class(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollContent$use() {
    		throw new Error("<TabScroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scrollContent$use(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollContent$class() {
    		throw new Error("<TabScroller>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scrollContent$class(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getScrollPosition() {
    		return this.$$.ctx[17];
    	}

    	set getScrollPosition(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getScrollContentWidth() {
    		return this.$$.ctx[18];
    	}

    	set getScrollContentWidth(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get incrementScroll() {
    		return this.$$.ctx[19];
    	}

    	set incrementScroll(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollTo() {
    		return this.$$.ctx[20];
    	}

    	set scrollTo(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[21];
    	}

    	set getElement(value) {
    		throw new Error("<TabScroller>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/.pnpm/@smui+tab-bar@4.2.0/node_modules/@smui/tab-bar/TabBar.svelte generated by Svelte v3.46.4 */
    const file$1 = "node_modules/.pnpm/@smui+tab-bar@4.2.0/node_modules/@smui/tab-bar/TabBar.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[32] = list[i];
    	child_ctx[34] = i;
    	return child_ctx;
    }

    const get_default_slot_changes = dirty => ({ tab: dirty[0] & /*tabs*/ 4 });
    const get_default_slot_context = ctx => ({ tab: /*tab*/ ctx[32] });

    // (21:4) {#each tabs as tab, i (key(tab))}
    function create_each_block$1(key_2, ctx) {
    	let first;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[27], get_default_slot_context);

    	const block = {
    		key: key_2,
    		first: null,
    		c: function create() {
    			first = empty();
    			if (default_slot) default_slot.c();
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope, tabs*/ 134217732)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[27], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(21:4) {#each tabs as tab, i (key(tab))}",
    		ctx
    	});

    	return block;
    }

    // (17:2) <TabScroller     bind:this={tabScroller}     {...prefixFilter($$restProps, 'tabScroller$')}   >
    function create_default_slot$1(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*tabs*/ ctx[2];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*key*/ ctx[3](/*tab*/ ctx[32]);
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$$scope, tabs, key*/ 134217740) {
    				each_value = /*tabs*/ ctx[2];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(17:2) <TabScroller     bind:this={tabScroller}     {...prefixFilter($$restProps, 'tabScroller$')}   >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let tabscroller;
    	let div_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const tabscroller_spread_levels = [prefixFilter(/*$$restProps*/ ctx[10], 'tabScroller$')];

    	let tabscroller_props = {
    		$$slots: { default: [create_default_slot$1] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < tabscroller_spread_levels.length; i += 1) {
    		tabscroller_props = assign(tabscroller_props, tabscroller_spread_levels[i]);
    	}

    	tabscroller = new TabScroller({ props: tabscroller_props, $$inline: true });
    	/*tabscroller_binding*/ ctx[21](tabscroller);

    	let div_levels = [
    		{
    			class: div_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-tab-bar': true
    			})
    		},
    		{ role: "tablist" },
    		exclude(/*$$restProps*/ ctx[10], ['tabScroller$'])
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(tabscroller.$$.fragment);
    			set_attributes(div, div_data);
    			add_location(div, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(tabscroller, div, null);
    			/*div_binding*/ ctx[22](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[7].call(null, div)),
    					listen_dev(div, "SMUI:tab:mount", /*SMUI_tab_mount_handler*/ ctx[23], false, false, false),
    					listen_dev(div, "SMUI:tab:unmount", /*SMUI_tab_unmount_handler*/ ctx[24], false, false, false),
    					listen_dev(div, "keydown", /*keydown_handler*/ ctx[25], false, false, false),
    					listen_dev(div, "MDCTab:interacted", /*MDCTab_interacted_handler*/ ctx[26], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const tabscroller_changes = (dirty[0] & /*$$restProps*/ 1024)
    			? get_spread_update(tabscroller_spread_levels, [get_spread_object(prefixFilter(/*$$restProps*/ ctx[10], 'tabScroller$'))])
    			: {};

    			if (dirty[0] & /*$$scope, tabs*/ 134217732) {
    				tabscroller_changes.$$scope = { dirty, ctx };
    			}

    			tabscroller.$set(tabscroller_changes);

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty[0] & /*className*/ 2 && div_class_value !== (div_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-tab-bar': true
    				}))) && { class: div_class_value },
    				{ role: "tablist" },
    				dirty[0] & /*$$restProps*/ 1024 && exclude(/*$$restProps*/ ctx[10], ['tabScroller$'])
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabscroller.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabscroller.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*tabscroller_binding*/ ctx[21](null);
    			destroy_component(tabscroller);
    			/*div_binding*/ ctx[22](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance_1($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","tabs","key","focusOnActivate","focusOnProgrammatic","useAutomaticActivation","active","scrollIntoView","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TabBar', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { tabs = [] } = $$props;
    	let { key = tab => tab } = $$props;
    	let { focusOnActivate = true } = $$props;
    	let { focusOnProgrammatic = false } = $$props;
    	let { useAutomaticActivation = true } = $$props;
    	let { active = null } = $$props;
    	let element;
    	let instance;
    	let tabScroller;
    	let activeIndex = tabs.indexOf(active);
    	let tabAccessorMap = {};
    	let tabAccessorWeakMap = new WeakMap();
    	let skipFocus = false;
    	setContext('SMUI:tab:focusOnActivate', focusOnActivate);
    	setContext('SMUI:tab:initialActive', active);

    	onMount(() => {
    		$$invalidate(4, instance = new MDCTabBarFoundation({
    				scrollTo: scrollX => tabScroller.scrollTo(scrollX),
    				incrementScroll: scrollXIncrement => tabScroller.incrementScroll(scrollXIncrement),
    				getScrollPosition: () => tabScroller.getScrollPosition(),
    				getScrollContentWidth: () => tabScroller.getScrollContentWidth(),
    				getOffsetWidth: () => getElement().offsetWidth,
    				isRTL: () => getComputedStyle(getElement()).getPropertyValue('direction') === 'rtl',
    				setActiveTab: index => {
    					$$invalidate(11, active = tabs[index]);
    					$$invalidate(17, activeIndex = index);
    					instance.activateTab(index);
    				},
    				activateTabAtIndex: (index, clientRect) => getAccessor(tabs[index]).activate(clientRect, skipFocus),
    				deactivateTabAtIndex: index => getAccessor(tabs[index]).deactivate(),
    				focusTabAtIndex: index => getAccessor(tabs[index]).focus(),
    				getTabIndicatorClientRectAtIndex: index => getAccessor(tabs[index]).computeIndicatorClientRect(),
    				getTabDimensionsAtIndex: index => getAccessor(tabs[index]).computeDimensions(),
    				getPreviousActiveTabIndex: () => {
    					for (let i = 0; i < tabs.length; i++) {
    						if (getAccessor(tabs[i]).active) {
    							return i;
    						}
    					}

    					return -1;
    				},
    				getFocusedTabIndex: () => {
    					const tabElements = tabs.map(tab => getAccessor(tab).element);
    					const activeElement = document.activeElement;
    					return tabElements.indexOf(activeElement);
    				},
    				getIndexOfTabById: id => tabs.indexOf(id),
    				getTabListLength: () => tabs.length,
    				notifyTabActivated: index => dispatch(getElement(), 'MDCTabBar:activated', { index })
    			}));

    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function handleTabMount(event) {
    		const accessor = event.detail;
    		addAccessor(accessor.tabId, accessor);
    	}

    	function handleTabUnmount(event) {
    		const accessor = event.detail;
    		removeAccessor(accessor.tabId);
    	}

    	function getAccessor(tabId) {
    		return tabId instanceof Object
    		? tabAccessorWeakMap.get(tabId)
    		: tabAccessorMap[tabId];
    	}

    	function addAccessor(tabId, accessor) {
    		if (tabId instanceof Object) {
    			tabAccessorWeakMap.set(tabId, accessor);
    			$$invalidate(19, tabAccessorWeakMap);
    		} else {
    			$$invalidate(18, tabAccessorMap[tabId] = accessor, tabAccessorMap);
    			$$invalidate(18, tabAccessorMap);
    		}
    	}

    	function removeAccessor(tabId) {
    		if (tabId instanceof Object) {
    			tabAccessorWeakMap.delete(tabId);
    			$$invalidate(19, tabAccessorWeakMap);
    		} else {
    			delete tabAccessorMap[tabId];
    			$$invalidate(18, tabAccessorMap);
    		}
    	}

    	function scrollIntoView(index) {
    		instance.scrollIntoView(index);
    	}

    	function getElement() {
    		return element;
    	}

    	function tabscroller_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			tabScroller = $$value;
    			$$invalidate(6, tabScroller);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(5, element);
    		});
    	}

    	const SMUI_tab_mount_handler = event => handleTabMount(event);
    	const SMUI_tab_unmount_handler = event => handleTabUnmount(event);
    	const keydown_handler = event => instance && instance.handleKeyDown(event);
    	const MDCTab_interacted_handler = event => instance && instance.handleTabInteraction(event);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('tabs' in $$new_props) $$invalidate(2, tabs = $$new_props.tabs);
    		if ('key' in $$new_props) $$invalidate(3, key = $$new_props.key);
    		if ('focusOnActivate' in $$new_props) $$invalidate(12, focusOnActivate = $$new_props.focusOnActivate);
    		if ('focusOnProgrammatic' in $$new_props) $$invalidate(13, focusOnProgrammatic = $$new_props.focusOnProgrammatic);
    		if ('useAutomaticActivation' in $$new_props) $$invalidate(14, useAutomaticActivation = $$new_props.useAutomaticActivation);
    		if ('active' in $$new_props) $$invalidate(11, active = $$new_props.active);
    		if ('$$scope' in $$new_props) $$invalidate(27, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCTabBarFoundation,
    		onMount,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		dispatch,
    		TabScroller,
    		forwardEvents,
    		use,
    		className,
    		tabs,
    		key,
    		focusOnActivate,
    		focusOnProgrammatic,
    		useAutomaticActivation,
    		active,
    		element,
    		instance,
    		tabScroller,
    		activeIndex,
    		tabAccessorMap,
    		tabAccessorWeakMap,
    		skipFocus,
    		handleTabMount,
    		handleTabUnmount,
    		getAccessor,
    		addAccessor,
    		removeAccessor,
    		scrollIntoView,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('tabs' in $$props) $$invalidate(2, tabs = $$new_props.tabs);
    		if ('key' in $$props) $$invalidate(3, key = $$new_props.key);
    		if ('focusOnActivate' in $$props) $$invalidate(12, focusOnActivate = $$new_props.focusOnActivate);
    		if ('focusOnProgrammatic' in $$props) $$invalidate(13, focusOnProgrammatic = $$new_props.focusOnProgrammatic);
    		if ('useAutomaticActivation' in $$props) $$invalidate(14, useAutomaticActivation = $$new_props.useAutomaticActivation);
    		if ('active' in $$props) $$invalidate(11, active = $$new_props.active);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(4, instance = $$new_props.instance);
    		if ('tabScroller' in $$props) $$invalidate(6, tabScroller = $$new_props.tabScroller);
    		if ('activeIndex' in $$props) $$invalidate(17, activeIndex = $$new_props.activeIndex);
    		if ('tabAccessorMap' in $$props) $$invalidate(18, tabAccessorMap = $$new_props.tabAccessorMap);
    		if ('tabAccessorWeakMap' in $$props) $$invalidate(19, tabAccessorWeakMap = $$new_props.tabAccessorWeakMap);
    		if ('skipFocus' in $$props) skipFocus = $$new_props.skipFocus;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*active, tabs, activeIndex, instance, focusOnProgrammatic*/ 141332) {
    			if (active !== tabs[activeIndex]) {
    				$$invalidate(17, activeIndex = tabs.indexOf(active));

    				if (instance) {
    					skipFocus = !focusOnProgrammatic;
    					instance.activateTab(activeIndex);
    					skipFocus = false;
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*tabs, tabAccessorWeakMap, tabAccessorMap, activeIndex*/ 917508) {
    			if (tabs.length) {
    				// Manually get the accessor so it is reactive.
    				const accessor = tabs[0] instanceof Object
    				? tabAccessorWeakMap.get(tabs[0])
    				: tabAccessorMap[tabs[0]];

    				if (accessor) {
    					accessor.forceAccessible(activeIndex === -1);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, useAutomaticActivation*/ 16400) {
    			if (instance) {
    				instance.setUseAutomaticActivation(useAutomaticActivation);
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		tabs,
    		key,
    		instance,
    		element,
    		tabScroller,
    		forwardEvents,
    		handleTabMount,
    		handleTabUnmount,
    		$$restProps,
    		active,
    		focusOnActivate,
    		focusOnProgrammatic,
    		useAutomaticActivation,
    		scrollIntoView,
    		getElement,
    		activeIndex,
    		tabAccessorMap,
    		tabAccessorWeakMap,
    		slots,
    		tabscroller_binding,
    		div_binding,
    		SMUI_tab_mount_handler,
    		SMUI_tab_unmount_handler,
    		keydown_handler,
    		MDCTab_interacted_handler,
    		$$scope
    	];
    }

    class TabBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1,
    			create_fragment$1,
    			safe_not_equal,
    			{
    				use: 0,
    				class: 1,
    				tabs: 2,
    				key: 3,
    				focusOnActivate: 12,
    				focusOnProgrammatic: 13,
    				useAutomaticActivation: 14,
    				active: 11,
    				scrollIntoView: 15,
    				getElement: 16
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TabBar",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get use() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabs() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabs(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focusOnActivate() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set focusOnActivate(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focusOnProgrammatic() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set focusOnProgrammatic(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get useAutomaticActivation() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set useAutomaticActivation(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<TabBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollIntoView() {
    		return this.$$.ctx[15];
    	}

    	set scrollIntoView(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[16];
    	}

    	set getElement(value) {
    		throw new Error("<TabBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    const CONTACTS = 'contacts';
    const MANIFEST  = 'manifest';
    const TOPICS = 'topics';

    const CURRENT_PRIVATE_MESSAGE_VERSION = 1.2;
    const SIG_REQUIRED = false;


    var alert_error = (msg) => {
        alert(msg);
        console.log(new Error("stack"));
    };

    function set_alert_error_handler(fn) {
        if ( typeof fn === 'function' ) {
            alert_error = fn;
        }
    }


    // // https://www.copious.world/interplanetary-contact
    var g_profile_port = '';   // 6111
    function correct_server(srvr) {
        if ( srvr.indexOf(':5') > 0 ) {
            srvr = srvr.replace('5111','6111');   /// CHANGE ...        
        }
        return srvr
    }

    var g_stem_prefix = 'interplanetary-contact/contact/';   // by service...


    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------
    // ASSETS


    async function fetch_asset(topics_cid,identity,btype,asset) {  // specifically from this user
        //
        let user_cid = identity.cid;
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol

        btype = btype ? true : false;
        
        let data_stem = `${g_stem_prefix}get-asset/${asset}`;
        let sp = '//';
        let post_data = {
            "btype" : btype,
            "user_cid" : user_cid,
            "cid" : topics_cid
        };
        let search_result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( search_result ) {
            if ( search_result.status === "OK" ) {
                let data = search_result[asset];
                if ( typeof data === 'string' ) {
                    let decryptor = await window.user_decryption(identity,asset);      // user user cid to get the decryptor...
                    if ( decryptor !== undefined ) {
                        try {
                            data = await decryptor(data);        // decryption
                        } catch (e) {
                        }
                    }
                    if ( data ) {
                        try {
                            let data_obj = JSON.parse(data);
                            return data_obj
                        } catch (e) {
                            return [false,data]
                        }
                    }    
                } else {
                    return data
                }
            }
        } else {
            return [false,search_result]
        }
    }


    async function fetch_contacts(contacts_cid,identity,btype) {  // specifically from this user
        return await fetch_asset(contacts_cid,identity,btype,CONTACTS)
    }

    async function fetch_manifest(manifest_cid,identity,btype) {  // specifically from this user
        return await fetch_asset(manifest_cid,identity,btype,MANIFEST)
    }

    async function fetch_topics(topics_cid,identity,btype) {  // specifically from this user
        return await fetch_asset(topics_cid,identity,btype,TOPICS)
    }


    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------
    // ASSETS


    async function update_asset_to_ipfs(asset,identity,is_business,contents) {
        let user_cid = identity.cid;
        let srver = location.host;
        srver = correct_server(srver);
        //
        if ( typeof contents !== 'string' ) {
            contents = JSON.stringify(contents);
        }
        let encryptor = await window.user_encryption(identity,asset);
        let encoded_contents = contents;
        if ( encryptor !== undefined ) {        // encryption
            encoded_contents = await encryptor(contents);
        }
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}put-asset/${asset}`;
        let sp = '//';
        let post_data = {
            "cid" : user_cid,
            "business" : is_business,
            "contents" : encoded_contents
        };
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            return result.update_cid
        }
        return false
    }


    async function update_contacts_to_ipfs(identity,is_business,contents) {
        return await update_asset_to_ipfs(CONTACTS,identity,is_business,contents)
    }

    async function update_manifest_to_ipfs(identity,is_business,contents) {
        return await update_asset_to_ipfs(MANIFEST,identity,is_business,contents)
    }

    async function update_topics_to_ipfs(identity,is_business,contents) {
        return await update_asset_to_ipfs(TOPICS,identity,is_business,contents)
    }

    // // contact page
    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------

    //
    // fetch_contact_page
    //
    async function fetch_contact_page(identity,business,asset,contact_cid) {  // specifically from this user
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}get-contact-page/${asset}`;     // asset as parameter
        let sp = '//';

        let post_data = {
            "cid" : contact_cid,     //
            "business" : business
        };
        let search_result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( search_result ) {
            let contact_form = search_result.contact;
            let decryptor = window.user_decryption(identity,asset);
            if ( decryptor !== undefined ) {
                try {
                    contact_form = await decryptor(contact_form);
                } catch (e) {
                }
            }
            if ( contact_form ) {
                if ( typeof contact_form === "string" ) {
                    let data_obj = JSON.parse(contact_form);
                    try {
                        return data_obj
                    } catch (e) {
                    }
                } else {
                    return contact_form
                }
            }
        }
        return false
    }

    // // 
    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------

    let g_user_fields = ["name", "DOB", "place_of_origin", "cool_public_info", "business", "public_key", "signer_public_key", "biometric"];
    // not checking for "cid" for most cases...
    async function add_profile(u_info) {
        let user_info = Object.assign(u_info);
        //
        for ( let field of g_user_fields ) {
            if ( user_info[field] === undefined ) {
                if ( field ===  "public_key" ) {
                    let p_key = get_user_public_wrapper_key(`${user_info.name}-${user_info.DOB}`);   // out of DB (index.html)
                    if ( p_key ) {
                        user_info.public_key = p_key;
                        continue
                    }
                }
                if ( field ===  "signer_public_key" ) {
                    let p_key = get_user_public_signer_key(`${user_info.name}-${user_info.DOB}`);   // out of DB (index.html)
                    if ( p_key ) {
                        user_info.signer_public_key = p_key;
                        continue
                    }
                }
                alert_error("undefined field " + field);
                return
            }
        }
        if ( user_info.cid !== undefined ) {        // remove reference to a cid when adding a new profile...
            delete user_info.cid;
        }
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}add/profile`;
        let sp = '//';
        let post_data = user_info;
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let ipfs_identity = result.data;
            if ( typeof ipfs_identity.dir_data === 'string' ) {
                ipfs_identity.dir_data = JSON.parse(ipfs_identity.dir_data);
            }
            // "id" : cid with key,
            // "clear_id" : cid without key,
            // "dir_data" : user directory structure
            u_info.cid = ipfs_identity.id;
            await finalize_user_identity(u_info,ipfs_identity);
            return true
        }
        return false
    }


    async function fetch_contact_cid(someones_info,clear) {  // a user,, not the owner of the manifest, most likely a recipients
        let user_info = Object.assign({},someones_info); 
        for ( let field of g_user_fields ) {
            if ( user_info[field] === undefined ) {
                if ( (field === "public_key") && clear ) {
                    delete user_info.public_key;
                    continue;
                }
                if ( (field === "signer_public_key") && clear ) {
                    delete user_info.signer_public_key;
                    continue;
                }
                if ( (field === "biometric")  && clear ) {     // when wrapping a key use the recipients public wrapper key
                    // delete public_key key from messages that are introductions, etc. (this is used for the clear user directory id)
                    delete user_info.biometric;            
                    continue
                }
                alert_error("undefined field " + field);
                return
            }
        }
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}get/user-cid`;
        let sp = '//';
        let post_data = user_info;
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let cid = result.cid;
            return cid
        }
        return false
    }

    async function fetch_cid_json(jcid) {
        if ( jcid === undefined ) return false
        //
        let data_stem = `${g_stem_prefix}get/json-cid/${jcid}`;
        let result = await fetchEndPoint(data_stem,g_profile_port);
        if ( result.status === "OK" ) {
            let json_str = result.json_str;
            if ( typeof json_str === "string" ) {
                try {
                    displayable = JSON.parse(json_str);
                    return displayable
                } catch (e) {}    
            } else {
                return json_str
            }
        }
        return false
    }




    async function fetch_contact_info(cid) {  // a user,, not the owner of the manifest, most likely a recipients
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}get/user-info`;
        let sp = '//';
        let post_data = {
            "cid" : cid
        };
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let user_info = result.user_info;
            return user_info
        }
        return false
    }




    async function get_dir(identity,clear) {
        //
        let user_info = identity.user_info;
        for ( let field of g_user_fields ) {
            if ( user_info[field] === undefined ) {
                if ( (field === "public_key")  && !(clear) ) {
                    let p_key = get_user_public_wrapper_key(`${user_info.name}-${user_info.DOB}`);
                    if ( p_key ) {
                        user_info[field] = p_key;
                        continue
                    }
                }
                if ( (field === "signer_public_key")  && !(clear) ) {
                    //continue
                    let p_key = get_user_public_signer_key(`${user_info.name}-${user_info.DOB}`);
                    if ( p_key ) {
                       user_info[field] = p_key;
                       continue
                    }
                }
                alert_error("undefined field " + field);
                return
            }
        }
        //
        if ( clear ) {
            delete user_info.public_key; 
        }
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}dir`;
        let sp = '//';
        let post_data = user_info;
        post_data.cid = identity.cid;
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let dir_tree = result.data;
            try {
                dir_tree = JSON.parse(dir_tree);
                return dir_tree
            } catch (e) {}
        }
        return false
    }
    async function send_kind_of_message(m_path,recipient_info,identity,message,clear) {
        //
        let user_info = identity.user_info;  // from sender == user_info
        // assume that user info has been properly formed and ready to act as recipient
        //
        // make sure that 
        let recipient = Object.assign({},recipient_info);
        for ( let field of g_user_fields ) {
            if ( (field === "public_key")  && clear ) {     // when wrapping a key use the recipients public wrapper key
                // delete public_key key from messages that are introductions, etc. (this is used for the clear user directory id)
                delete recipient_info.public_key;            
                continue
            }
            if ( (field === "signer_public_key")  && clear ) {     // when wrapping a key use the recipients public wrapper key
                // delete public_key key from messages that are introductions, etc. (this is used for the clear user directory id)
                delete recipient_info.signer_public_key;            
                continue
            }
            if ( (field === "biometric")  && clear ) {     // when wrapping a key use the recipients public wrapper key
                // delete public_key key from messages that are introductions, etc. (this is used for the clear user directory id)
                delete recipient_info.biometric;            
                continue
            }
            if ( recipient[field] === undefined ) {
                alert_error("undefined field " + field);
                return
            }
        }

        let sendable_message = Object.assign({},message);
        //
        let user_cid = identity.cid;
        sendable_message.user_cid = user_cid;    // cid of from  (should have been set)
                                                            // the recipient will wrap key with this (so refresh his memory)
        if ( clear ) {
            sendable_message.public_key = user_info.public_key;
            sendable_message.signer_public_key = user_info.signer_public_key;  // send the signature key in the intro (just this once)
            // the id of the clear directory ignores the key.
            // the identity of established contact messages requires the public key (so it stays for not clear)
            delete recipient.public_key;  // this has to do with the identiy and the directory where introductions go.
            delete recipient.signer_public_key;  // and this. Clear identity does not use keys
        } else  {
            //
            if ( sendable_message.when === undefined ) sendable_message.when = Date.now();
            if ( sendable_message.date === undefined ) sendable_message.date = (new Date(message.date)).toISOString();
            if ( sendable_message.name === undefined ) sendable_message.name = user_info.name;       // from

            // should have been set in the interface ... but can still catch this here.
            sendable_message.public_key = user_info.public_key;  // basically says we know the recipient (we have talked)
            sendable_message.nonce = message.nonce;  // for AES CBC...
            //
            // CAN'T PROCEED WITHOUT A KEY
            //
            let key_to_wrap = await window.gen_cipher_key();  /// this will be an AES KEY, new each time.
            if ( key_to_wrap === undefined || !(key_to_wrap) ) {
                alert_error("could not get key ");
                alert("no cipher key");
                return
            } else {
                //
                sendable_message.message = JSON.stringify(message);  // STRINGIFY
                //
                let encryptor = await window.user_encryption(identity,"message");  // encryptor may vary by user... assuming more than one in indexedDB
                let encoded_contents = sendable_message.message; 
                if ( encryptor !== undefined ) {
                    let aes_key = key_to_wrap;                   // ENCRYPT
                    encoded_contents = await encryptor(encoded_contents,aes_key,sendable_message.nonce);  // CBC starting with nonce...
                }
                sendable_message.message = encoded_contents;     // ENCODED
                //
                // WRAP the key just used with the public wrapper key of the recipient (got the key via introduction...)
                sendable_message.wrapped_key = await window.key_wrapper(key_to_wrap,recipient.public_key);
                // SIGN the wrapped key using the sender's private signer key (receiver should already have public signature...)
                sendable_message.signature = await window.key_signer(sendable_message.wrapped_key,identity.signer_priv_key);
                //
                delete sendable_message.subject;
                delete sendable_message.readers;
            }

            sendable_message.version = CURRENT_PRIVATE_MESSAGE_VERSION;
        }
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}${m_path}`;
        let sp = '//';
        let post_data = {
            "receiver" : recipient,
            "message" : sendable_message
        };
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let m_cid = result.message_cid;
            return m_cid
        }
        return false
    }

    /*
    if ( !(introduction) && encrypting ) {
        if ( encrypting ) {
            message = {
                "name" : active_identity.user_info.name,
                "user_cid" : active_identity.cid
            }
            let [wrapped, aes_key] = get_wrapped_aes_key(public_key)  // recipient's public wrapper key
            message.wrapped_key = wrapped
            message.ctext = get_encipherd_message(JSON.stringify(message_object),aes_key)
        }
    }
    */


    async function send_message(recipient_info,identity,message) {
        let m_path = 'send/message';
        let result = await send_kind_of_message(m_path,recipient_info,identity,message,false);
        return result
    }


    async function send_introduction(recipient_info,identity,message) {
        let m_path = 'send/introduction';
        let result = await send_kind_of_message(m_path,recipient_info,identity,message,true);
        return result
    }


    async function send_topic(recipient_info,identity,message) {
        let m_path = '/send/topic';
        let result = await send_kind_of_message(m_path,recipient_info,identity,message,false);
        return result
    }


    async function send_topic_offer(recipient_info,identity,message) {
        let m_path = '/send/topic_offer';
        let result = await send_kind_of_message(m_path,recipient_info,identity,message,true);
        return result
    }

    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------

    async function* message_decryptor(messages,identity) {
        let priv_key = identity.priv_key;
        for ( let message of messages ) {
            if ( message.version && (message.version > 1.0) ) {
                let wrapped_key = message.wrapped_key;
                try {
                    let signature = message.signature;
                    if ( signature || SIG_REQUIRED ) {
                        if ( !signature ) continue
                        let user_cid = message.user_cid;
                        let contact = contact_from_cid(user_cid);
                        let signer_pub_key = contact.signer_public_key;
                        //
                        let ok = await window.verifier(wrapped_key,signature,signer_pub_key);
                        if ( !(ok) ) continue
                    }
                    let clear_m = await window.decipher_message(message.message,wrapped_key,priv_key,message.nonce);
                    if ( clear_m !== false ) {
                        message.message = JSON.parse(clear_m);
                    } else {
                        continue
                    }
                } catch (e) {}
            }
            yield message;
        }
    }

    async function clarify_message(messages,identity) {
        let clear_messages = [];
        try {
            for await (let message of message_decryptor(messages,identity) ) {
                try {
                    let cmessage = false;
                    if ( typeof message.message === "string" ) {
                        cmessage = JSON.parse(message.message);
                    } else {
                        cmessage = message.message;
                    }
                    if ( message.f_cid ) {
                        cmessage.f_cid =  message.f_cid;
                    }
                    clear_messages.push(cmessage);
                } catch (e) {
                    //clear_messages.push(message)
                }
            }
        } catch (e) {
            console.log('caught', e);
        }
        return(clear_messages)
    }

    // get_spool_files
    //  ---- identity - sender's information...
    //  ---- spool_select - the name of a spool, e.g. 'spool' 'deleted', 'read', 'events', etc.
    //  ---- clear -- WHICH PATHWAY -- use either the 'clear' cid path (no keys, no encryption) or use the key based message pathway, cid
    //  ---- offset -- offset into the dirctory list (paging)
    //  ---- count -- max per page
    //
    async function get_spool_files(identity,spool_select,clear,offset,count) {
        //
        let cid = identity.cid;
        if ( clear ) {
            cid = identity.clear_cid;
        }
        if ( cid === undefined ) return false
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}get-spool`;
        let sp = '//';
        let post_data = {
            'cid' : cid,
            'spool' : spool_select,  // false for introduction
            'business' : identity.user_info.business,
            'offset' : offset,
            'count' : count
        };
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let messages = result.data;
            let cid_list = result.cid_list;
            try {
                if ( Array.isArray(messages) ) {
                    messages = messages.map((msg,index) => {
                        if ( typeof msg === "string" ) {
                            try {
                                let obj = JSON.parse(msg);
                                if ( cid_list ) {
                                    obj.f_cid = cid_list[index];
                                }
                                return obj
                            } catch(e) {
                                return msg
                            }
                        }
                    });
                } else if ( typeof messages === 'string' ) {
                    messages = JSON.parse(messages);
                }
                if ( !clear ) {
                    messages = await clarify_message(messages,identity);
                }
                return messages
            } catch (e) {}
        }
        return false
    }


    async function get_special_files(identity,op_category,offset,count) {
        //
        return await get_spool_files(identity,op_category,false,offset,count)
        //
    }


    async function get_message_files(identity,offset,count) {
        // picks up both clear and encrypted messages...
        //
        // expected_messages -- decrypted messages from the key based identity
        let expected_messages = await get_spool_files(identity,true,false,offset,count);
        //
        // solicitations -- message sent by those who don't have the receiver's public keys 
        let solicitations = await get_spool_files(identity,true,true,offset,count);
        //
        return [expected_messages,solicitations]
    }

    async function get_topic_files(identity,offset,count) {
        let expected_messages = await get_spool_files(identity,false,false,offset,count);
        let solicitations = await get_spool_files(identity,false,true,offset,count);
        return [expected_messages,solicitations]
    }

    async function get_categorized_message_files(identity,op_category,offset,count) {
        let expected_messages = await get_special_files(identity,op_category,offset,count);
        return expected_messages
    }


    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------
    //
    //  PUBLIC TEMPLATES AVAILABLE FROM DESIGNERS....
    //


    async function get_template_list(offset,count,category,btype) {
        //
        if ( category === undefined ) {
            category = 'any';
        }
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}template-list/${category}`;
        let sp = '//';
        let post_data = {
            'category' : category,
            'business_types' : btype ? "business" : "profile",
            'start' : offset,
            'count' : count
        };
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let t_list = result.templates;
            try {
                t_list = JSON.parse(t_list);
                return t_list
            } catch (e) {}
        }
        return false
    }



    async function get_contact_template(template_cid) {
        //
        let data_stem = `${g_stem_prefix}get/template-cid/${template_cid}`;
        let result = await fetchEndPoint(data_stem,g_profile_port);
        if ( result.status === "OK" ) {
            let contact_template = result.template;
            if ( typeof contact_template === "string" ) {
                try {
                    contact_template = JSON.parse(contact_template);
                    return contact_template
                } catch (e) {}    
            } else {
                return contact_template
            }
        }
        return false
    }


    async function get_named_contact_template(template_name,biz) {
        //
        let biz_t = biz ? "business" : "profile";
        let data_stem = `${g_stem_prefix}get/template-name/${biz_t}/${template_name}`;
        let result = await fetchEndPoint(data_stem,g_profile_port);
        if ( result.status === "OK" ) {
            let contact_template = result.data;
            try {
                t_list = JSON.parse(contact_template);
                return contact_template
            } catch (e) {}
        }
        return false
    }



    async function get_named_contact_template_cid(template_name,biz) {
        let data_stem = `${g_stem_prefix}get/template-cid-from-name/${biz}/${template_name}`;
        let result = await fetchEndPoint(data_stem,g_profile_port);
        if ( result.status === "OK" ) {
            let cid = result.cid;
            return cid
        }
        return false
    }


    async function put_contact_template(name,data) {
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        if ( typeof data !== 'string' ) {
            data = JSON.stringify(data);
        }
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}put/template`;
        let sp = '//';
        let post_data = {
            'name' : name,
            'uri_encoded_json' : encodeURIComponent(data)
        };
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let t_cid = result.template_cid;
            return t_cid
        }
        return false
    }

    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------
    //

    async function message_list_ops(user_cid,dst_cid,op,param,biz_t,message_list,src_cat) {
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}message-list-op/${op}`;
        let sp = '//';
        let post_data = {
            'user_cid' : user_cid,
            'dst_cid' : dst_cid,
            'param' : param,
            'business' : biz_t,
            'message_list' : message_list.join(',')
        };
        if ( src_cat ) {
            post_data.source_category = src_cat;
        }
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let t_cid = result.template_cid;
            return t_cid
        }
        return false
    }


    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------
    //

    const CHUNK_SIZE = 1000000;
    // upload_data_file
    async function upload_data_file(name,blob64) {
        //
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}put/blob`;
        let sp = '//';
        let len = blob64.length;
        let post_data = {
            "name" : name,
            "tstamp" : Date.now(),
            "offset" : 0,
            "chunk" : "",
            "end" : false
        };
        for ( let i = 0; i < len; i += CHUNK_SIZE ) {
            let chunk = blob64.substr(i,CHUNK_SIZE);
            post_data.chunk = chunk;
            post_data.offset = i;
            if ( (i + CHUNK_SIZE ) > len ) {
                post_data.end = true;
            }
            let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
            if ( result.status === "OK" ) {
                if ( result.end_of_data ) {
                    let f_cid = result.cid;
                    return f_cid    
                }
            }
        }

        return false
        //
    }




    async function load_blob_as_url(blob_cid) {
        let srver = location.host;
        srver = correct_server(srver);
        //
        let prot = location.protocol;  // prot for (prot)ocol
        let data_stem = `${g_stem_prefix}get/blob`;
        let sp = '//';
        let post_data = {
            "cid" : blob_cid
        };
        let result = await postData(`${prot}${sp}${srver}/${data_stem}`, post_data);
        if ( result.status === "OK" ) {
            let data = result.data;
            return data    
        }
        //
        return false
    }


    // -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- --------
    //


    // dont_store_html
    function dont_store_html(manifest_obj) {
        //
        let cc_forms = manifest_obj.custom_contact_forms;
        //
        let cids = [];
        let cid_map = {};
        if ( Array.isArray(cc_forms) ) {
            for ( let entry of cc_forms ) {
                delete entry.html;
                let cid = entry.cid;
                if ( entry.preference === undefined ) {
                    entry.preference = 1.0;
                }
                cids.push(entry.cid);
                cid_map[cid] = entry;
            }
        } else {
            cid_map = cc_forms;
            for ( let cid in cc_forms ) {
                let entry = cc_forms[cid];
                delete entry.html;
                entry.cid = cid;
                cids.push(cid);
            }
        }

        manifest_obj.custom_contact_forms = cid_map;
        manifest_obj.sorted_cids = cids.sort((a,b) => {
            return(cid_map[a].preference - cid_map[b].preference)
        });
    }

    var ipfs_profiles = /*#__PURE__*/Object.freeze({
        __proto__: null,
        set_alert_error_handler: set_alert_error_handler,
        fetch_contacts: fetch_contacts,
        fetch_manifest: fetch_manifest,
        fetch_topics: fetch_topics,
        update_contacts_to_ipfs: update_contacts_to_ipfs,
        update_manifest_to_ipfs: update_manifest_to_ipfs,
        update_topics_to_ipfs: update_topics_to_ipfs,
        fetch_contact_page: fetch_contact_page,
        add_profile: add_profile,
        fetch_contact_cid: fetch_contact_cid,
        fetch_cid_json: fetch_cid_json,
        fetch_contact_info: fetch_contact_info,
        get_dir: get_dir,
        send_message: send_message,
        send_introduction: send_introduction,
        send_topic: send_topic,
        send_topic_offer: send_topic_offer,
        get_message_files: get_message_files,
        get_topic_files: get_topic_files,
        get_categorized_message_files: get_categorized_message_files,
        get_template_list: get_template_list,
        get_contact_template: get_contact_template,
        get_named_contact_template: get_named_contact_template,
        get_named_contact_template_cid: get_named_contact_template_cid,
        put_contact_template: put_contact_template,
        message_list_ops: message_list_ops,
        upload_data_file: upload_data_file,
        load_blob_as_url: load_blob_as_url,
        dont_store_html: dont_store_html
    });

    function subst(str,value,match_list) {
        for ( let mm of match_list ) {
            str = str.replace(mm[0],value);
        }
        return str
    }


    class ContactVar {

        constructor(id,mfield) {
            this.id = id;
            this.access_method = 'innerHTML';  // or innerHTML
            this.message_value = '';
            this.message_field = mfield;
            this.match_list = false;
        }

        add_matches(op_key,matches) {
            this.match_list = matches;
            if ( op_key ) {
                this.access_method = op_key.substr(op_key.lastIndexOf('-') + 1);
                this.access_method = this.access_method.replace('}}','');    
            } // else don't change the access method...
        }

        subst(str) {
            str = subst(str,this.id,this.match_list);
            return str
        }

        extract_value() {
            let domel = document.getElementById(this.id);
            let value = "";
            if ( this.access_method === "value" ) {
                value = domel.value;
            } else {
                value = domel.innerHTML;
            }
            return(value)
        }

        set_el_html(txt) {
            let domel = document.getElementById(this.id);
            if ( domel ) domel.innerHTML = txt;
        }
    }


    function cvar_factory(id,mfield) {
        let cvar = new ContactVar(id,mfield);
        return cvar
    }


    var g_var_descr_regex  = new RegExp('{{([A-Za-z0-9\#\_\-]+)}}','g');
    //
    function unload_html_vars(html) {
        const matches = html.matchAll(g_var_descr_regex);
        let v_map = {};
        for ( const match of matches ) {
            if ( match ) {
                let key = match[0];
                if ( v_map[key] === undefined ) {
                    v_map[key] = [];
                }
                v_map[key].push(match);
            }
        }
        return v_map
    }


    // // 
    function subst_vars_app_ids(html,html_vars,ccvars) {
        for ( let ky in html_vars ) {
            let hyph = ky.lastIndexOf('-') + 1;
            if ( hyph > 0 ) {
                let hyph1 = ky.indexOf('-') + 1;
                if ( hyph1 === hyph ) {
                    let cvar = ccvars[ky];
                    if ( cvar ) {
                        cvar.add_matches(false,html_vars[ky]);
                        html = cvar.subst(html);
                    }    
                } else {
                    let match_key = ky.substr(0,hyph);
                    let cvar = ccvars[match_key];
                    if ( cvar ) {
                        cvar.add_matches(ky,html_vars[ky]);
                        html = cvar.subst(html);
                    }    
                }
            }
        }
        return html
    }


    function clear_char(str,char) {
        let split_up = str.split(char);
        let back_together = split_up.join('');
        return back_together
    }


    	/*
    	// FILE
    	lastModified
    	lastModifiedDate
    	name
    	size
    	type --- mime/type
    	......
    	slice(start,end,contentType)
    	stream
    	text
    	arrayBuffer	

    	DataTransfer items
    	kind  (string or file)
    	type
    	getAsFile
    	getAsString

    	*/

    function drop(items,files) {
        //
        let p = new Promise((resolve,reject) => {
            if ( items ) {
                // Use DataTransferItemList interface to access the file(s)
                for ( let i = 0; i < items.length; i++ ) {
                    if ( items[i].kind === 'file' ) {
                        let file = items[i].getAsFile();
                        let fname = file.name;
                        var reader = new FileReader();
                            reader.onload = async (e) => {
                                let blob64 = e.target.result;
                                resolve([fname,blob64]);
                            };
                            reader.readAsDataURL(file);
                        break
                    }
                }
            } else if ( files ) {
                // Use DataTransfer interface to access the file(s)
                for ( let i = 0; i < files.length; i++ ) {
                    let file = files[i].getAsFile();
                    let fname = file.name;
                    reader.onload = (e) => {
                        let blob64 = e.target.result;
                        resolve([fname,blob64]);
                    };
                    reader.readAsDataURL(file);
                    break
                }
            } else {
                reject(false);
            }
        });
        return p
    }


    function check_empty(parameters) {
        //
        let b = parameters.some( el => {
            if ( el === false ) return true
            if ( (typeof el === "string")  && (el.length === 0) ) return true
            if ( typeof el === "undefined" ) return true
            return false
        });
        //
        return b
    }

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        cvar_factory: cvar_factory,
        unload_html_vars: unload_html_vars,
        subst_vars_app_ids: subst_vars_app_ids,
        clear_char: clear_char,
        drop: drop,
        check_empty: check_empty
    });

    /* src/App.svelte generated by Svelte v3.46.4 */

    const { Object: Object_1, console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[119] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (1140:2) <Label>
    function create_default_slot_2(ctx) {
    	let span;
    	let t_value = /*tab*/ ctx[121] + "";
    	let t;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);

    			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*tab*/ ctx[121] === /*active*/ ctx[4]
    			? "active-tab"
    			: "plain-tab") + " svelte-1b4dyig"));

    			add_location(span, file, 1139, 9, 26697);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[3] & /*tab*/ 268435456 && t_value !== (t_value = /*tab*/ ctx[121] + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*active*/ 16 | dirty[3] & /*tab*/ 268435456 && span_class_value !== (span_class_value = "" + (null_to_empty(/*tab*/ ctx[121] === /*active*/ ctx[4]
    			? "active-tab"
    			: "plain-tab") + " svelte-1b4dyig"))) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(1140:2) <Label>",
    		ctx
    	});

    	return block;
    }

    // (1139:3) <Tab {tab}>
    function create_default_slot_1(ctx) {
    	let label;
    	let current;

    	label = new CommonLabel({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty[0] & /*active*/ 16 | dirty[3] & /*$$scope, tab*/ 805306368) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(1139:3) <Tab {tab}>",
    		ctx
    	});

    	return block;
    }

    // (1137:1) <TabBar tabs={['Identify', 'User', 'About Us']} let:tab bind:active>
    function create_default_slot(ctx) {
    	let tab;
    	let current;

    	tab = new Tab({
    			props: {
    				tab: /*tab*/ ctx[121],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tab.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tab, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tab_changes = {};
    			if (dirty[3] & /*tab*/ 268435456) tab_changes.tab = /*tab*/ ctx[121];

    			if (dirty[0] & /*active*/ 16 | dirty[3] & /*$$scope, tab*/ 805306368) {
    				tab_changes.$$scope = { dirty, ctx };
    			}

    			tab.$set(tab_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tab.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tab.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tab, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(1137:1) <TabBar tabs={['Identify', 'User', 'About Us']} let:tab bind:active>",
    		ctx
    	});

    	return block;
    }

    // (1297:36) 
    function create_if_block_8(ctx) {
    	let div;
    	let blockquote0;
    	let t1;
    	let blockquote1;
    	let t2;
    	let b0;
    	let t4;
    	let blockquote2;
    	let t5;
    	let ol;
    	let li0;
    	let b1;
    	let t7;
    	let t8;
    	let li1;
    	let b2;
    	let t10;
    	let t11;
    	let li2;
    	let b3;
    	let t13;
    	let b4;
    	let t15;
    	let t16;
    	let blockquote3;
    	let t18;
    	let blockquote4;
    	let t20;
    	let blockquote5;
    	let span;
    	let t22;
    	let blockquote6;
    	let t24;
    	let blockquote7;

    	const block = {
    		c: function create() {
    			div = element("div");
    			blockquote0 = element("blockquote");
    			blockquote0.textContent = "This service is free.";
    			t1 = space();
    			blockquote1 = element("blockquote");
    			t2 = text("Use this service to create an identity, and then, use it to create and optionally maintain a personal frame page initially accessible at unique subdomain \n\t\tof ");
    			b0 = element("b");
    			b0.textContent = "of-this.world";
    			t4 = space();
    			blockquote2 = element("blockquote");
    			t5 = text("That is three things made here:\n\t\t");
    			ol = element("ol");
    			li0 = element("li");
    			b1 = element("b");
    			b1.textContent = "Intergalactic Identity";
    			t7 = text(" - with locally stored information");
    			t8 = space();
    			li1 = element("li");
    			b2 = element("b");
    			b2.textContent = "A web page";
    			t10 = text(" - stored on peer 2 peer Web3 style storage free for you to use, access, edit, move, etc.");
    			t11 = space();
    			li2 = element("li");
    			b3 = element("b");
    			b3.textContent = "A subdomain";
    			t13 = text(" - ");
    			b4 = element("b");
    			b4.textContent = "your name";
    			t15 = text(".of-this.world");
    			t16 = space();
    			blockquote3 = element("blockquote");
    			blockquote3.textContent = "The frame page makes your personal, human and private, web usage into one in which you command authorization in your relation to services.";
    			t18 = space();
    			blockquote4 = element("blockquote");
    			blockquote4.textContent = "As the commander of services, you require the service to ask you for authorization.";
    			t20 = space();
    			blockquote5 = element("blockquote");
    			span = element("span");
    			span.textContent = "You require that businesses log into you. You don't have to log into them.";
    			t22 = space();
    			blockquote6 = element("blockquote");
    			blockquote6.textContent = "The reason we have asked for information you might tell anyone is that we are asking for information you want to share. This information should identify you,\n\t\tbut not give away secrets. Given the informtion, programs provided by this page will make an identity for you. This will be your distributable identity.";
    			t24 = space();
    			blockquote7 = element("blockquote");
    			blockquote7.textContent = "You may user your distributed identity in any website that will take one.";
    			attr_dev(blockquote0, "class", "svelte-1b4dyig");
    			add_location(blockquote0, file, 1298, 2, 34100);
    			attr_dev(b0, "class", "svelte-1b4dyig");
    			add_location(b0, file, 1303, 5, 34330);
    			attr_dev(blockquote1, "class", "svelte-1b4dyig");
    			add_location(blockquote1, file, 1301, 2, 34155);
    			attr_dev(b1, "class", "svelte-1b4dyig");
    			add_location(b1, file, 1308, 7, 34454);
    			attr_dev(li0, "class", "svelte-1b4dyig");
    			add_location(li0, file, 1308, 3, 34450);
    			attr_dev(b2, "class", "svelte-1b4dyig");
    			add_location(b2, file, 1309, 7, 34530);
    			attr_dev(li1, "class", "svelte-1b4dyig");
    			add_location(li1, file, 1309, 3, 34526);
    			attr_dev(b3, "class", "svelte-1b4dyig");
    			add_location(b3, file, 1310, 7, 34649);
    			set_style(b4, "color", "darkseagreen");
    			attr_dev(b4, "class", "svelte-1b4dyig");
    			add_location(b4, file, 1310, 28, 34670);
    			attr_dev(li2, "class", "svelte-1b4dyig");
    			add_location(li2, file, 1310, 3, 34645);
    			set_style(ol, "padding-left", "4%");
    			attr_dev(ol, "class", "svelte-1b4dyig");
    			add_location(ol, file, 1307, 2, 34418);
    			attr_dev(blockquote2, "class", "svelte-1b4dyig");
    			add_location(blockquote2, file, 1305, 2, 34369);
    			attr_dev(blockquote3, "class", "svelte-1b4dyig");
    			add_location(blockquote3, file, 1313, 2, 34759);
    			attr_dev(blockquote4, "class", "svelte-1b4dyig");
    			add_location(blockquote4, file, 1316, 2, 34931);
    			set_style(span, "font-weight", "bold");
    			attr_dev(span, "class", "svelte-1b4dyig");
    			add_location(span, file, 1320, 2, 35063);
    			attr_dev(blockquote5, "class", "svelte-1b4dyig");
    			add_location(blockquote5, file, 1319, 2, 35048);
    			attr_dev(blockquote6, "class", "svelte-1b4dyig");
    			add_location(blockquote6, file, 1322, 2, 35197);
    			attr_dev(blockquote7, "class", "svelte-1b4dyig");
    			add_location(blockquote7, file, 1326, 2, 35543);
    			attr_dev(div, "class", "team_message svelte-1b4dyig");
    			add_location(div, file, 1297, 1, 34069);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, blockquote0);
    			append_dev(div, t1);
    			append_dev(div, blockquote1);
    			append_dev(blockquote1, t2);
    			append_dev(blockquote1, b0);
    			append_dev(div, t4);
    			append_dev(div, blockquote2);
    			append_dev(blockquote2, t5);
    			append_dev(blockquote2, ol);
    			append_dev(ol, li0);
    			append_dev(li0, b1);
    			append_dev(li0, t7);
    			append_dev(ol, t8);
    			append_dev(ol, li1);
    			append_dev(li1, b2);
    			append_dev(li1, t10);
    			append_dev(ol, t11);
    			append_dev(ol, li2);
    			append_dev(li2, b3);
    			append_dev(li2, t13);
    			append_dev(li2, b4);
    			append_dev(li2, t15);
    			append_dev(div, t16);
    			append_dev(div, blockquote3);
    			append_dev(div, t18);
    			append_dev(div, blockquote4);
    			append_dev(div, t20);
    			append_dev(div, blockquote5);
    			append_dev(blockquote5, span);
    			append_dev(div, t22);
    			append_dev(div, blockquote6);
    			append_dev(div, t24);
    			append_dev(div, blockquote7);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(1297:36) ",
    		ctx
    	});

    	return block;
    }

    // (1178:33) 
    function create_if_block_2(ctx) {
    	let div17;
    	let div10;
    	let br0;
    	let t0;
    	let div0;
    	let t2;
    	let br1;
    	let t3;
    	let div1;
    	let label0;
    	let t5;
    	let input0;
    	let t6;
    	let input1;
    	let span0;
    	let t8;
    	let div2;
    	let t9;
    	let div3;
    	let t10;
    	let div4;
    	let label1;
    	let br2;
    	let t12;
    	let textarea;
    	let t13;
    	let div5;
    	let t14;
    	let div9;
    	let blockquote0;
    	let div6;
    	let b0;
    	let t16;
    	let t17;
    	let div7;
    	let t18;
    	let span1;
    	let t20;
    	let i0;
    	let b1;
    	let t22;
    	let t23;
    	let div8;
    	let t25;
    	let blockquote1;
    	let t26;
    	let b2;
    	let t28;
    	let t29;
    	let blockquote3;
    	let t30;
    	let b3;
    	let t32;
    	let i1;
    	let t34;
    	let i2;
    	let t36;
    	let blockquote2;
    	let t38;
    	let blockquote5;
    	let t39;
    	let blockquote4;
    	let t41;
    	let blockquote6;
    	let span2;
    	let t43;
    	let span3;
    	let t45;
    	let t46;
    	let div16;
    	let div11;
    	let t47;
    	let span4;
    	let t48;
    	let span4_class_value;
    	let t49;
    	let div15;
    	let t50;
    	let t51;
    	let div14;
    	let div12;
    	let button0;
    	let t53;
    	let button1;
    	let t55;
    	let div13;
    	let button2;
    	let t57;
    	let button3;
    	let mounted;
    	let dispose;

    	function select_block_type_2(ctx, dirty) {
    		if (/*business*/ ctx[13]) return create_if_block_7;
    		return create_else_block_3;
    	}

    	let current_block_type = select_block_type_2(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_3(ctx, dirty) {
    		if (/*business*/ ctx[13]) return create_if_block_6;
    		return create_else_block_2;
    	}

    	let current_block_type_1 = select_block_type_3(ctx);
    	let if_block1 = current_block_type_1(ctx);

    	function select_block_type_4(ctx, dirty) {
    		if (/*creation_to_do*/ ctx[5]) return create_if_block_5;
    		return create_else_block_1;
    	}

    	let current_block_type_2 = select_block_type_4(ctx);
    	let if_block2 = current_block_type_2(ctx);
    	let if_block3 = /*creation_to_do*/ ctx[5] && create_if_block_4(ctx);
    	let if_block4 = !/*creation_to_do*/ ctx[5] && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			div17 = element("div");
    			div10 = element("div");
    			br0 = element("br");
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "Please enter Unique Information about yourself which you would be willing to share with anyone:";
    			t2 = space();
    			br1 = element("br");
    			t3 = space();
    			div1 = element("div");
    			label0 = element("label");
    			label0.textContent = "Name:";
    			t5 = space();
    			input0 = element("input");
    			t6 = space();
    			input1 = element("input");
    			span0 = element("span");
    			span0.textContent = "Business (if checked)";
    			t8 = space();
    			div2 = element("div");
    			if_block0.c();
    			t9 = space();
    			div3 = element("div");
    			if_block1.c();
    			t10 = space();
    			div4 = element("div");
    			label1 = element("label");
    			label1.textContent = "Cool Public Info";
    			br2 = element("br");
    			t12 = space();
    			textarea = element("textarea");
    			t13 = space();
    			div5 = element("div");
    			if_block2.c();
    			t14 = space();
    			div9 = element("div");
    			blockquote0 = element("blockquote");
    			div6 = element("div");
    			b0 = element("b");
    			b0.textContent = "Enter your information above";
    			t16 = text(" This information will be used to make your Intergalactic identity.");
    			t17 = space();
    			div7 = element("div");
    			t18 = text("When you click on the button, ");
    			span1 = element("span");
    			span1.textContent = "Create my Intergalactic Identity";
    			t20 = text(", your information will be stored within \n\t\t\t\t\t\tyour browser under the domain of this page.\n\t\t\t\t\t\tThen, processes on this page will create your identitfier. At the top level, \n\t\t\t\t\t\tyou will have a ");
    			i0 = element("i");
    			b1 = element("b");
    			b1.textContent = "base64 hash";
    			t22 = text(" of an encryption of the data that you entered.");
    			t23 = space();
    			div8 = element("div");
    			div8.textContent = "The hash will be associated with a JSON structure being stored in your browser within IndexedDB.\n\t\t\t\t\t\tWithin the local structure, you will have private and public keys.";
    			t25 = space();
    			blockquote1 = element("blockquote");
    			t26 = text("You will be able to download the identity structure as a JSON obect at any time.\n\t\t\t\t");
    			b2 = element("b");
    			b2.textContent = "This JSON structure information will never be sent from the browser by these pages.";
    			t28 = text(" It will be stored in the bowser database \n\t\t\t\tas long as you want.");
    			t29 = space();
    			blockquote3 = element("blockquote");
    			t30 = text("Use the buttons on the right side of the page to create or delete an identity. And, use the ");
    			b3 = element("b");
    			b3.textContent = "Identity";
    			t32 = text(" buttons,\n\t\t\t\twith the ");
    			i1 = element("i");
    			i1.textContent = "down";
    			t34 = text(" triangle ▼ and the ");
    			i2 = element("i");
    			i2.textContent = "up";
    			t36 = text(" triangle ▲ to download your JSON to disk and to upload your identity, respectively.\n\t\t\t\t\t");
    			blockquote2 = element("blockquote");
    			blockquote2.textContent = "For exampe, you may download your identity to a thumb drive for safe keeping. Or you may upload your identity into another\n\t\t\t\t\tbrowser or restore to a browser if it has been previously deleted.";
    			t38 = space();
    			blockquote5 = element("blockquote");
    			t39 = text("The information you enter above should be unique. \n\t\t\t\t\t");
    			blockquote4 = element("blockquote");
    			blockquote4.textContent = "For example, I know that my name is shared by at least three other people on the planet,\n\t\t\t\t\tall of whom were born in the same year. But, they are from different towns or countries. So, I don't hesitate to enter my place of origin.\n\t\t\t\t\tFurthermore, I am willing to share my real place of origin with anyone.";
    			t41 = space();
    			blockquote6 = element("blockquote");
    			span2 = element("span");
    			span2.textContent = "Note:";
    			t43 = text(" no information will be sent to any organization as a result of entering information here.\n\t\t\t\tAll information will be stored locally except for the public information needed to generate your personal frame page. \n\t\t\t\tA single page will be generated for your personal frame page at subdomain of the governing URL of this page. \n\t\t\t\tAgain, this information will be stored within the browser database on your device. \n\t\t\t\tYou will access your peronal frame page by your peronal URL (such as an ");
    			span3 = element("span");
    			span3.textContent = "of-this.world";
    			t45 = text(" url.)\n\t\t\t\tThe database record will only be accessible from this URL.");
    			t46 = space();
    			div16 = element("div");
    			div11 = element("div");
    			t47 = text("status: ");
    			span4 = element("span");
    			t48 = text(/*signup_status*/ ctx[9]);
    			t49 = space();
    			div15 = element("div");
    			if (if_block3) if_block3.c();
    			t50 = space();
    			if (if_block4) if_block4.c();
    			t51 = space();
    			div14 = element("div");
    			div12 = element("div");
    			button0 = element("button");
    			button0.textContent = "∋ new";
    			t53 = space();
    			button1 = element("button");
    			button1.textContent = "∌ remove";
    			t55 = space();
    			div13 = element("div");
    			button2 = element("button");
    			button2.textContent = "▼ identity";
    			t57 = space();
    			button3 = element("button");
    			button3.textContent = "▲ identity";
    			attr_dev(br0, "class", "svelte-1b4dyig");
    			add_location(br0, file, 1180, 3, 28061);
    			attr_dev(div0, "class", "top_instructions svelte-1b4dyig");
    			add_location(div0, file, 1181, 3, 28069);
    			attr_dev(br1, "class", "svelte-1b4dyig");
    			add_location(br1, file, 1184, 3, 28214);
    			attr_dev(label0, "for", "name");
    			set_style(label0, "display", "inline");
    			attr_dev(label0, "class", "svelte-1b4dyig");
    			add_location(label0, file, 1186, 4, 28251);
    			attr_dev(input0, "id", "name");
    			attr_dev(input0, "placeholder", "Name");
    			set_style(input0, "display", "inline");
    			attr_dev(input0, "class", "svelte-1b4dyig");
    			add_location(input0, file, 1188, 4, 28316);
    			attr_dev(input1, "type", "checkbox");
    			set_style(input1, "display", "inline");
    			attr_dev(input1, "class", "svelte-1b4dyig");
    			add_location(input1, file, 1189, 4, 28398);
    			attr_dev(span0, "class", "svelte-1b4dyig");
    			add_location(span0, file, 1189, 76, 28470);
    			attr_dev(div1, "class", "inner_div svelte-1b4dyig");
    			add_location(div1, file, 1185, 3, 28222);
    			attr_dev(div2, "class", "inner_div svelte-1b4dyig");
    			add_location(div2, file, 1191, 3, 28518);
    			attr_dev(div3, "class", "inner_div svelte-1b4dyig");
    			add_location(div3, file, 1198, 3, 28906);
    			attr_dev(label1, "for", "self-text");
    			attr_dev(label1, "class", "svelte-1b4dyig");
    			add_location(label1, file, 1206, 3, 29349);
    			attr_dev(br2, "class", "svelte-1b4dyig");
    			add_location(br2, file, 1206, 50, 29396);
    			attr_dev(textarea, "id", "self-text");
    			attr_dev(textarea, "placeholder", "Something you would say to anyone about yourself");
    			attr_dev(textarea, "class", "svelte-1b4dyig");
    			add_location(textarea, file, 1207, 3, 29404);
    			attr_dev(div4, "class", "inner_div svelte-1b4dyig");
    			add_location(div4, file, 1205, 3, 29321);
    			attr_dev(div5, "class", "add-profile-div svelte-1b4dyig");
    			set_style(div5, "text-align", "center");
    			add_location(div5, file, 1209, 3, 29538);
    			attr_dev(b0, "class", "svelte-1b4dyig");
    			add_location(b0, file, 1223, 6, 30247);
    			attr_dev(div6, "class", "instructor svelte-1b4dyig");
    			add_location(div6, file, 1222, 5, 30215);
    			set_style(span1, "font-weight", "bolder");
    			set_style(span1, "color", "navy");
    			attr_dev(span1, "class", "svelte-1b4dyig");
    			add_location(span1, file, 1226, 36, 30429);
    			attr_dev(b1, "class", "svelte-1b4dyig");
    			add_location(b1, file, 1229, 25, 30713);
    			attr_dev(i0, "class", "svelte-1b4dyig");
    			add_location(i0, file, 1229, 22, 30710);
    			attr_dev(div7, "class", "instructor svelte-1b4dyig");
    			add_location(div7, file, 1225, 5, 30367);
    			attr_dev(div8, "class", "instructor svelte-1b4dyig");
    			add_location(div8, file, 1231, 5, 30800);
    			attr_dev(blockquote0, "class", "svelte-1b4dyig");
    			add_location(blockquote0, file, 1221, 4, 30197);
    			attr_dev(b2, "class", "svelte-1b4dyig");
    			add_location(b2, file, 1238, 4, 31139);
    			attr_dev(blockquote1, "class", "svelte-1b4dyig");
    			add_location(blockquote1, file, 1236, 4, 31037);
    			attr_dev(b3, "class", "svelte-1b4dyig");
    			add_location(b3, file, 1242, 96, 31428);
    			attr_dev(i1, "class", "svelte-1b4dyig");
    			add_location(i1, file, 1243, 13, 31466);
    			attr_dev(i2, "class", "svelte-1b4dyig");
    			add_location(i2, file, 1243, 44, 31497);
    			attr_dev(blockquote2, "class", "svelte-1b4dyig");
    			add_location(blockquote2, file, 1244, 5, 31596);
    			attr_dev(blockquote3, "class", "svelte-1b4dyig");
    			add_location(blockquote3, file, 1241, 4, 31319);
    			attr_dev(blockquote4, "class", "svelte-1b4dyig");
    			add_location(blockquote4, file, 1251, 5, 31923);
    			attr_dev(blockquote5, "class", "svelte-1b4dyig");
    			add_location(blockquote5, file, 1249, 4, 31850);
    			set_style(span2, "color", "blue");
    			attr_dev(span2, "class", "svelte-1b4dyig");
    			add_location(span2, file, 1258, 4, 32309);
    			attr_dev(span3, "class", "svelte-1b4dyig");
    			add_location(span3, file, 1262, 76, 32839);
    			attr_dev(blockquote6, "class", "svelte-1b4dyig");
    			add_location(blockquote6, file, 1257, 4, 32292);
    			attr_dev(div9, "class", "nice_message svelte-1b4dyig");
    			add_location(div9, file, 1220, 3, 30166);
    			attr_dev(div10, "class", "signerupper svelte-1b4dyig");
    			add_location(div10, file, 1179, 2, 28032);

    			attr_dev(span4, "class", span4_class_value = "" + (null_to_empty(/*signup_status*/ ctx[9] === 'OK'
    			? "good-status"
    			: "bad-status") + " svelte-1b4dyig"));

    			add_location(span4, file, 1269, 12, 33043);
    			attr_dev(div11, "class", "signup-status svelte-1b4dyig");
    			add_location(div11, file, 1268, 3, 33003);
    			attr_dev(button0, "class", "svelte-1b4dyig");
    			add_location(button0, file, 1284, 6, 33667);
    			attr_dev(button1, "class", "svelte-1b4dyig");
    			add_location(button1, file, 1285, 6, 33729);
    			attr_dev(div12, "class", "contact_controls svelte-1b4dyig");
    			add_location(div12, file, 1283, 5, 33630);
    			attr_dev(button2, "class", "svelte-1b4dyig");
    			add_location(button2, file, 1288, 6, 33851);
    			attr_dev(button3, "class", "svelte-1b4dyig");
    			add_location(button3, file, 1289, 6, 33919);
    			attr_dev(div13, "class", "contact_controls svelte-1b4dyig");
    			add_location(div13, file, 1287, 5, 33814);
    			attr_dev(div14, "class", "svelte-1b4dyig");
    			add_location(div14, file, 1282, 4, 33619);
    			attr_dev(div15, "class", "svelte-1b4dyig");
    			add_location(div15, file, 1271, 3, 33147);
    			attr_dev(div16, "class", "signerupper svelte-1b4dyig");
    			add_location(div16, file, 1267, 2, 32974);
    			attr_dev(div17, "class", "signup-grid-container svelte-1b4dyig");
    			add_location(div17, file, 1178, 1, 27994);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div17, anchor);
    			append_dev(div17, div10);
    			append_dev(div10, br0);
    			append_dev(div10, t0);
    			append_dev(div10, div0);
    			append_dev(div10, t2);
    			append_dev(div10, br1);
    			append_dev(div10, t3);
    			append_dev(div10, div1);
    			append_dev(div1, label0);
    			append_dev(div1, t5);
    			append_dev(div1, input0);
    			set_input_value(input0, /*name*/ ctx[1]);
    			append_dev(div1, t6);
    			append_dev(div1, input1);
    			input1.checked = /*business*/ ctx[13];
    			append_dev(div1, span0);
    			append_dev(div10, t8);
    			append_dev(div10, div2);
    			if_block0.m(div2, null);
    			append_dev(div10, t9);
    			append_dev(div10, div3);
    			if_block1.m(div3, null);
    			append_dev(div10, t10);
    			append_dev(div10, div4);
    			append_dev(div4, label1);
    			append_dev(div4, br2);
    			append_dev(div4, t12);
    			append_dev(div4, textarea);
    			set_input_value(textarea, /*cool_public_info*/ ctx[12]);
    			append_dev(div10, t13);
    			append_dev(div10, div5);
    			if_block2.m(div5, null);
    			append_dev(div10, t14);
    			append_dev(div10, div9);
    			append_dev(div9, blockquote0);
    			append_dev(blockquote0, div6);
    			append_dev(div6, b0);
    			append_dev(div6, t16);
    			append_dev(blockquote0, t17);
    			append_dev(blockquote0, div7);
    			append_dev(div7, t18);
    			append_dev(div7, span1);
    			append_dev(div7, t20);
    			append_dev(div7, i0);
    			append_dev(i0, b1);
    			append_dev(div7, t22);
    			append_dev(blockquote0, t23);
    			append_dev(blockquote0, div8);
    			append_dev(div9, t25);
    			append_dev(div9, blockquote1);
    			append_dev(blockquote1, t26);
    			append_dev(blockquote1, b2);
    			append_dev(blockquote1, t28);
    			append_dev(div9, t29);
    			append_dev(div9, blockquote3);
    			append_dev(blockquote3, t30);
    			append_dev(blockquote3, b3);
    			append_dev(blockquote3, t32);
    			append_dev(blockquote3, i1);
    			append_dev(blockquote3, t34);
    			append_dev(blockquote3, i2);
    			append_dev(blockquote3, t36);
    			append_dev(blockquote3, blockquote2);
    			append_dev(div9, t38);
    			append_dev(div9, blockquote5);
    			append_dev(blockquote5, t39);
    			append_dev(blockquote5, blockquote4);
    			append_dev(div9, t41);
    			append_dev(div9, blockquote6);
    			append_dev(blockquote6, span2);
    			append_dev(blockquote6, t43);
    			append_dev(blockquote6, span3);
    			append_dev(blockquote6, t45);
    			append_dev(div17, t46);
    			append_dev(div17, div16);
    			append_dev(div16, div11);
    			append_dev(div11, t47);
    			append_dev(div11, span4);
    			append_dev(span4, t48);
    			append_dev(div16, t49);
    			append_dev(div16, div15);
    			if (if_block3) if_block3.m(div15, null);
    			append_dev(div15, t50);
    			if (if_block4) if_block4.m(div15, null);
    			append_dev(div15, t51);
    			append_dev(div15, div14);
    			append_dev(div14, div12);
    			append_dev(div12, button0);
    			append_dev(div12, t53);
    			append_dev(div12, button1);
    			append_dev(div14, t55);
    			append_dev(div14, div13);
    			append_dev(div13, button2);
    			append_dev(div13, t57);
    			append_dev(div13, button3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[50]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[51]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[56]),
    					listen_dev(button0, "click", /*clear_identify_form*/ ctx[21], false, false, false),
    					listen_dev(button1, "click", /*remove_identify_seen_in_form*/ ctx[22], false, false, false),
    					listen_dev(button2, "click", /*app_download_identity*/ ctx[26], false, false, false),
    					listen_dev(button3, "click", /*app_upload_identity*/ ctx[25], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*name*/ 2 && input0.value !== /*name*/ ctx[1]) {
    				set_input_value(input0, /*name*/ ctx[1]);
    			}

    			if (dirty[0] & /*business*/ 8192) {
    				input1.checked = /*business*/ ctx[13];
    			}

    			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div2, null);
    				}
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_3(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div3, null);
    				}
    			}

    			if (dirty[0] & /*cool_public_info*/ 4096) {
    				set_input_value(textarea, /*cool_public_info*/ ctx[12]);
    			}

    			if (current_block_type_2 === (current_block_type_2 = select_block_type_4(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_2(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div5, null);
    				}
    			}

    			if (dirty[0] & /*signup_status*/ 512) set_data_dev(t48, /*signup_status*/ ctx[9]);

    			if (dirty[0] & /*signup_status*/ 512 && span4_class_value !== (span4_class_value = "" + (null_to_empty(/*signup_status*/ ctx[9] === 'OK'
    			? "good-status"
    			: "bad-status") + " svelte-1b4dyig"))) {
    				attr_dev(span4, "class", span4_class_value);
    			}

    			if (/*creation_to_do*/ ctx[5]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block_4(ctx);
    					if_block3.c();
    					if_block3.m(div15, t50);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (!/*creation_to_do*/ ctx[5]) {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);
    				} else {
    					if_block4 = create_if_block_3(ctx);
    					if_block4.c();
    					if_block4.m(div15, t51);
    				}
    			} else if (if_block4) {
    				if_block4.d(1);
    				if_block4 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div17);
    			if_block0.d();
    			if_block1.d();
    			if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(1178:33) ",
    		ctx
    	});

    	return block;
    }

    // (1145:1) {#if (active === 'Identify')}
    function create_if_block(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let br0;
    	let t2;
    	let br1;
    	let t3;
    	let br2;
    	let t4;

    	function select_block_type_1(ctx, dirty) {
    		if (/*known_users*/ ctx[3].length > 0) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if_block.c();
    			t0 = space();
    			div0 = element("div");
    			t1 = text("Make your identity to be kept within the browser. \n\t\t\t");
    			br0 = element("br");
    			t2 = text("\n\t\t\tGet an Intergalactic identity for use in messaging and running web sessions.\n\t\t\t");
    			br1 = element("br");
    			t3 = text("\n\t\t\tSet up your personal URL and frame page.\n\t\t\t");
    			br2 = element("br");
    			t4 = text("\n\t\t\tMake use of a browser extension to translate your URL into a Web3 style domain.");
    			attr_dev(br0, "class", "svelte-1b4dyig");
    			add_location(br0, file, 1169, 3, 27714);
    			attr_dev(br1, "class", "svelte-1b4dyig");
    			add_location(br1, file, 1171, 3, 27802);
    			attr_dev(br2, "class", "svelte-1b4dyig");
    			add_location(br2, file, 1173, 3, 27854);
    			attr_dev(div0, "class", "front-page-explain svelte-1b4dyig");
    			add_location(div0, file, 1167, 2, 27624);
    			attr_dev(div1, "class", "splash-if-you-will svelte-1b4dyig");
    			set_style(div1, "height", "fit-content");
    			add_location(div1, file, 1145, 1, 26840);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if_block.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			append_dev(div0, br0);
    			append_dev(div0, t2);
    			append_dev(div0, br1);
    			append_dev(div0, t3);
    			append_dev(div0, br2);
    			append_dev(div0, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div1, t0);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(1145:1) {#if (active === 'Identify')}",
    		ctx
    	});

    	return block;
    }

    // (1195:4) {:else}
    function create_else_block_3(ctx) {
    	let label;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			label.textContent = "DOB: ";
    			input = element("input");
    			attr_dev(label, "for", "DOB");
    			set_style(label, "display", "inline");
    			attr_dev(label, "class", "svelte-1b4dyig");
    			add_location(label, file, 1195, 5, 28743);
    			attr_dev(input, "id", "DOB");
    			attr_dev(input, "placeholder", "Date of Birth");
    			set_style(input, "display", "inline");
    			attr_dev(input, "class", "svelte-1b4dyig");
    			add_location(input, file, 1195, 59, 28797);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*DOB*/ ctx[10]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_1*/ ctx[53]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*DOB*/ 1024 && input.value !== /*DOB*/ ctx[10]) {
    				set_input_value(input, /*DOB*/ ctx[10]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(1195:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1193:4) {#if business }
    function create_if_block_7(ctx) {
    	let label;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			label.textContent = "Year of Inception: ";
    			input = element("input");
    			attr_dev(label, "for", "DOB");
    			set_style(label, "display", "inline");
    			attr_dev(label, "class", "svelte-1b4dyig");
    			add_location(label, file, 1193, 5, 28568);
    			attr_dev(input, "id", "DOB");
    			attr_dev(input, "placeholder", "Year of Inception");
    			set_style(input, "display", "inline");
    			attr_dev(input, "class", "svelte-1b4dyig");
    			add_location(input, file, 1193, 73, 28636);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*DOB*/ ctx[10]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[52]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*DOB*/ 1024 && input.value !== /*DOB*/ ctx[10]) {
    				set_input_value(input, /*DOB*/ ctx[10]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(1193:4) {#if business }",
    		ctx
    	});

    	return block;
    }

    // (1202:4) {:else}
    function create_else_block_2(ctx) {
    	let label;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			label.textContent = "Place of Origin: ";
    			input = element("input");
    			attr_dev(label, "for", "POO");
    			set_style(label, "display", "inline");
    			attr_dev(label, "class", "svelte-1b4dyig");
    			add_location(label, file, 1202, 5, 29132);
    			attr_dev(input, "id", "POO");
    			attr_dev(input, "placeholder", "Place of Origin");
    			set_style(input, "display", "inline");
    			attr_dev(input, "class", "svelte-1b4dyig");
    			add_location(input, file, 1202, 71, 29198);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*place_of_origin*/ ctx[11]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_3*/ ctx[55]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*place_of_origin*/ 2048 && input.value !== /*place_of_origin*/ ctx[11]) {
    				set_input_value(input, /*place_of_origin*/ ctx[11]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(1202:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1200:4) {#if business }
    function create_if_block_6(ctx) {
    	let label;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			label.textContent = "Main Office: ";
    			input = element("input");
    			attr_dev(label, "for", "POO");
    			set_style(label, "display", "inline");
    			attr_dev(label, "class", "svelte-1b4dyig");
    			add_location(label, file, 1200, 5, 28956);
    			attr_dev(input, "id", "POO");
    			attr_dev(input, "placeholder", "Main Office");
    			set_style(input, "display", "inline");
    			attr_dev(input, "class", "svelte-1b4dyig");
    			add_location(input, file, 1200, 68, 29019);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*place_of_origin*/ ctx[11]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_2*/ ctx[54]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*place_of_origin*/ 2048 && input.value !== /*place_of_origin*/ ctx[11]) {
    				set_input_value(input, /*place_of_origin*/ ctx[11]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(1200:4) {#if business }",
    		ctx
    	});

    	return block;
    }

    // (1215:4) {:else}
    function create_else_block_1(ctx) {
    	let div;
    	let span0;
    	let t1;
    	let span1;
    	let t2;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			span0.textContent = "Your custom id number:";
    			t1 = space();
    			span1 = element("span");
    			t2 = text(/*active_cid*/ ctx[0]);
    			attr_dev(span0, "class", "cid-grabber-label svelte-1b4dyig");
    			add_location(span0, file, 1216, 6, 30023);
    			attr_dev(span1, "class", "cid-grabber svelte-1b4dyig");
    			add_location(span1, file, 1216, 68, 30085);

    			attr_dev(div, "style", div_style_value = /*green*/ ctx[16]
    			? "background-color:rgba(245,255,250,0.9)"
    			: "background-color:rgba(250,250,250,0.3)");

    			attr_dev(div, "class", "svelte-1b4dyig");
    			add_location(div, file, 1215, 5, 29906);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(span1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*active_cid*/ 1) set_data_dev(t2, /*active_cid*/ ctx[0]);

    			if (dirty[0] & /*green*/ 65536 && div_style_value !== (div_style_value = /*green*/ ctx[16]
    			? "background-color:rgba(245,255,250,0.9)"
    			: "background-color:rgba(250,250,250,0.3)")) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(1215:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1211:4) {#if creation_to_do }
    function create_if_block_5(ctx) {
    	let div;
    	let button;
    	let t;
    	let div_style_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			t = text("Create my Intergalactic Identity.");
    			attr_dev(button, "class", "long_button svelte-1b4dyig");
    			button.disabled = /*creator_disabled*/ ctx[17];
    			add_location(button, file, 1212, 6, 29743);

    			attr_dev(div, "style", div_style_value = /*green*/ ctx[16]
    			? "background-color:rgba(245,255,250,0.9)"
    			: "background-color:rgba(250,250,250,0.3)");

    			attr_dev(div, "class", "svelte-1b4dyig");
    			add_location(div, file, 1211, 5, 29626);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*create_intergalactic_id*/ ctx[20], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*creator_disabled*/ 131072) {
    				prop_dev(button, "disabled", /*creator_disabled*/ ctx[17]);
    			}

    			if (dirty[0] & /*green*/ 65536 && div_style_value !== (div_style_value = /*green*/ ctx[16]
    			? "background-color:rgba(245,255,250,0.9)"
    			: "background-color:rgba(250,250,250,0.3)")) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(1211:4) {#if creation_to_do }",
    		ctx
    	});

    	return block;
    }

    // (1273:4) {#if creation_to_do }
    function create_if_block_4(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*active_profile_biometric*/ ctx[18])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*src_biometric_instruct*/ ctx[8]);
    			attr_dev(img, "class", "svelte-1b4dyig");
    			add_location(img, file, 1274, 5, 33274);
    			attr_dev(div, "class", "picture-drop svelte-1b4dyig");
    			add_location(div, file, 1273, 4, 33183);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			/*img_binding*/ ctx[57](img);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "drop", /*drop_biometric*/ ctx[24], false, false, false),
    					listen_dev(div, "dragover", dragover_picture, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*src_biometric_instruct*/ 256) {
    				attr_dev(img, "alt", /*src_biometric_instruct*/ ctx[8]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*img_binding*/ ctx[57](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(1273:4) {#if creation_to_do }",
    		ctx
    	});

    	return block;
    }

    // (1278:4) {#if !creation_to_do }
    function create_if_block_3(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*active_profile_image*/ ctx[7])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*src_1_name*/ ctx[19]);
    			attr_dev(img, "class", "svelte-1b4dyig");
    			add_location(img, file, 1279, 5, 33513);
    			attr_dev(div, "class", "picture-drop svelte-1b4dyig");
    			add_location(div, file, 1278, 4, 33424);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			/*img_binding_1*/ ctx[58](img);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "drop", /*drop_picture*/ ctx[23], false, false, false),
    					listen_dev(div, "dragover", dragover_picture, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*active_profile_image*/ 128 && !src_url_equal(img.src, img_src_value = /*active_profile_image*/ ctx[7])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*img_binding_1*/ ctx[58](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(1278:4) {#if !creation_to_do }",
    		ctx
    	});

    	return block;
    }

    // (1160:2) {:else}
    function create_else_block(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let span;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text("Get started with your Intergalactic Identity.\n\t\t\t");
    			div0 = element("div");
    			t1 = text("Click on the ");
    			span = element("span");
    			span.textContent = "User";
    			t3 = text(" tab.");
    			attr_dev(span, "class", "svelte-1b4dyig");
    			add_location(span, file, 1163, 17, 27572);
    			attr_dev(div0, "class", "svelte-1b4dyig");
    			add_location(div0, file, 1162, 3, 27549);
    			attr_dev(div1, "class", "splash-if-you-will svelte-1b4dyig");
    			add_location(div1, file, 1160, 2, 27463);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			append_dev(div0, span);
    			append_dev(div0, t3);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(1160:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1147:2) {#if (known_users.length > 0) }
    function create_if_block_1(ctx) {
    	let div1;
    	let t0;
    	let span;

    	let t1_value = (/*active_user*/ ctx[2]
    	? /*active_user*/ ctx[2].name
    	: "being created") + "";

    	let t1;
    	let t2;
    	let br;
    	let t3;
    	let div0;
    	let select;
    	let mounted;
    	let dispose;
    	let each_value = /*known_users*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text("The current user is ");
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = text(".\n\t\t\t");
    			br = element("br");
    			t3 = text("\n\t\t\tNot you? Select from the list below or Add yourself with the User tab.\n\t\t\t");
    			div0 = element("div");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "class", "svelte-1b4dyig");
    			add_location(span, file, 1148, 23, 26993);
    			attr_dev(br, "class", "svelte-1b4dyig");
    			add_location(br, file, 1149, 3, 27062);
    			attr_dev(select, "size", 10);
    			set_style(select, "text-align", "center");
    			attr_dev(select, "class", "svelte-1b4dyig");
    			if (/*u_index*/ ctx[6] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[49].call(select));
    			add_location(select, file, 1152, 4, 27202);
    			attr_dev(div0, "class", "user-options svelte-1b4dyig");
    			set_style(div0, "text-align", "center");
    			add_location(div0, file, 1151, 3, 27144);
    			set_style(div1, "height", "fit-content");
    			attr_dev(div1, "class", "svelte-1b4dyig");
    			add_location(div1, file, 1147, 2, 26937);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, span);
    			append_dev(span, t1);
    			append_dev(div1, t2);
    			append_dev(div1, br);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*u_index*/ ctx[6]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[49]),
    					listen_dev(select, "click", /*navigate_to_user*/ ctx[27], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*active_user*/ 4 && t1_value !== (t1_value = (/*active_user*/ ctx[2]
    			? /*active_user*/ ctx[2].name
    			: "being created") + "")) set_data_dev(t1, t1_value);

    			if (dirty[0] & /*known_users*/ 8) {
    				each_value = /*known_users*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty[0] & /*u_index*/ 64) {
    				select_option(select, /*u_index*/ ctx[6]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(1147:2) {#if (known_users.length > 0) }",
    		ctx
    	});

    	return block;
    }

    // (1154:5) {#each known_users as maybe_user, u_index }
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*maybe_user*/ ctx[119].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*u_index*/ ctx[6];
    			option.value = option.__value;
    			attr_dev(option, "class", "svelte-1b4dyig");
    			add_location(option, file, 1154, 6, 27353);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*known_users*/ 8 && t_value !== (t_value = /*maybe_user*/ ctx[119].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(1154:5) {#each known_users as maybe_user, u_index }",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let tabbar;
    	let updating_active;
    	let t0;
    	let br;
    	let t1;
    	let current;

    	function tabbar_active_binding(value) {
    		/*tabbar_active_binding*/ ctx[48](value);
    	}

    	let tabbar_props = {
    		tabs: ['Identify', 'User', 'About Us'],
    		$$slots: {
    			default: [
    				create_default_slot,
    				({ tab }) => ({ 121: tab }),
    				({ tab }) => [0, 0, 0, tab ? 268435456 : 0]
    			]
    		},
    		$$scope: { ctx }
    	};

    	if (/*active*/ ctx[4] !== void 0) {
    		tabbar_props.active = /*active*/ ctx[4];
    	}

    	tabbar = new TabBar({ props: tabbar_props, $$inline: true });
    	binding_callbacks.push(() => bind(tabbar, 'active', tabbar_active_binding));

    	function select_block_type(ctx, dirty) {
    		if (/*active*/ ctx[4] === 'Identify') return create_if_block;
    		if (/*active*/ ctx[4] === 'User') return create_if_block_2;
    		if (/*active*/ ctx[4] === 'About Us') return create_if_block_8;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(tabbar.$$.fragment);
    			t0 = space();
    			br = element("br");
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(br, "class", "svelte-1b4dyig");
    			add_location(br, file, 1142, 2, 26802);
    			attr_dev(div, "class", "svelte-1b4dyig");
    			add_location(div, file, 1132, 0, 26476);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(tabbar, div, null);
    			append_dev(div, t0);
    			append_dev(div, br);
    			append_dev(div, t1);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tabbar_changes = {};

    			if (dirty[0] & /*active*/ 16 | dirty[3] & /*$$scope, tab*/ 805306368) {
    				tabbar_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_active && dirty[0] & /*active*/ 16) {
    				updating_active = true;
    				tabbar_changes.active = /*active*/ ctx[4];
    				add_flush_callback(() => updating_active = false);
    			}

    			tabbar.$set(tabbar_changes);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(tabbar);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function popup_size() {
    	let smallest_w = 200; // smallest and bigget willing to accomodate
    	let biggest_w = 3000;
    	let smallest_h = 600;
    	let biggest_h = 1000;

    	// bounded window width
    	let w = Math.max(smallest_w, window.innerWidth);

    	w = Math.min(biggest_w, w);

    	// bounded window height
    	let h = Math.max(smallest_h, window.innerHeight);

    	h = Math.min(biggest_h, h);
    	let p_range;
    	let P;

    	//	percentage h range 
    	let h_p_max = 0.96;

    	let h_p_min = 0.75;
    	p_range = h_p_max - h_p_min;
    	P = (biggest_h - h) / (biggest_h - smallest_h);

    	//console.log("P h: " + P)
    	let h_scale = P * p_range + h_p_min;

    	//	percentage w range 
    	let w_p_max = 0.96;

    	let w_p_min = 0.20;
    	p_range = w_p_max - w_p_min;
    	P = (biggest_w - w) / (biggest_w - smallest_w);

    	//console.log("P w: " + P)
    	let w_scale = P * p_range + w_p_min;

    	// Setting the current height & width 
    	// to the elements 
    	return { "w": w_scale, "h": h_scale };
    }

    function dragover_picture(ev) {
    	ev.preventDefault();
    }

    function instance($$self, $$props, $$invalidate) {
    	let filteredIndviduals;
    	let filtered_manifest_contact_form_list;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let active_profile_image = ""; //"/favicon.png" ; // "/brent-fox-jane-18-b.jpg"
    	let active_profile_biometric = "";

    	//
    	let src_1_name = "Drop a picture here";

    	let src_biometric_instruct = "Drop binary biometric file here";

    	//
    	let active_cid = "";

    	let clear_cid = "";
    	let dir_view = false;
    	let signup_status = "OK";

    	//
    	let start_of_messages = 0;

    	let messages_per_page = 100;
    	let prefix = '';
    	let man_prefix = '';
    	let i = 0;
    	let c_i = 0;
    	let i_i = 0;
    	let p_i = 0;
    	let form_index = 0;
    	let name = '';
    	let DOB = '';
    	let place_of_origin = '';
    	let cool_public_info = '';
    	let business = false;
    	let biometric_blob = '';
    	let c_name = '';
    	let c_DOB = '';
    	let c_place_of_origin = '';
    	let c_cool_public_info = '';
    	let c_business = false;
    	let c_public_key = "testesttesttest";
    	let c_signer_public_key = "testesttesttest";
    	let c_cid = "testesttesttest";
    	let c_answer_message = '';
    	let c_biometric_blob = '';
    	let c_empty_fields = false;
    	let today = new Date().toUTCString();
    	let active_user = false;
    	let active_identity = false;
    	let known_users = [false];
    	let known_identities = [false];
    	let u_index = 0;
    	let adding_new = false;
    	let manifest_selected_entry = false;
    	let manifest_selected_form = false;
    	let manifest_contact_form_list = [false];

    	//
    	let manifest_obj = {};

    	let manifest_index = 0;
    	let man_title = '';
    	let man_cid = '';
    	let man_wrapped_key = '';
    	let man_html = '';
    	let man_max_preference = 1.0;
    	let man_preference = 1.0;

    	//
    	let man_sel_not_customized = true;

    	let man_contact_is_default = false;

    	//
    	let man_encrypted = false;

    	let message_edit_from_contact = false;
    	let profile_image_el;
    	let biometric_data_el;

    	//
    	let active = 'Identify';

    	let prev_active = active;
    	let first_message = 0;
    	let green = false; // an indicator telling if this user ID is set
    	let todays_date = new Date().toLocaleString();
    	let filtered_cc_list = [];
    	let message_op_category = "read";
    	let source_category = "messages";
    	let processed_category = "Use Op to Select";

    	// This is just a default... It will be used until the user picks something else 
    	// when editing the manifest.
    	let selected_form_link_types = {
    		"business": {
    			"link": "latest-contact",
    			"from_cid": "QmTfD2LyTy8WGgdUkKE1Z1vAfb6HwNgmZA5kMaFAiy4fuz"
    		},
    		"profile": {
    			"link": "latest-contact",
    			"from_cid": "QmTfD2LyTy8WGgdUkKE1Z1vAfb6HwNgmZA5kMaFAiy4fuz"
    		}
    	};

    	let selected_form_link = selected_form_link_types["profile"];

    	//
    	let individuals = [
    		{
    			"name": 'Hans Solo',
    			"DOB": "1000",
    			"place_of_origin": "alpha centauri",
    			"cool_public_info": "He is a Master Jedi",
    			"business": false,
    			"public_key": "testesttesttest",
    			"signer_public_key": "ha ha ha ha ha ha ha ",
    			"cid": "4504385938",
    			"answer_message": "",
    			"biometric": "53535"
    		}
    	];

    	let cid_individuals_map = {};
    	let selected = individuals[0];

    	let inbound_solicitation_messages = [
    		{
    			"name": 'Darth Vadar',
    			"user_cid": "869968609",
    			"subject": "Hans Solo is Mean",
    			"date": todays_date,
    			"readers": "luke,martha,chewy",
    			"business": false,
    			"public_key": false,
    			"message": "this is a message 4",
    			"reply_with": "default"
    		}
    	];

    	let inbound_contact_messages = [
    		{
    			"name": 'Hans Solo',
    			"user_cid": "4504385938",
    			"subject": "Darth Vadier Attacks",
    			"date": todays_date,
    			"readers": "joe,jane,harry",
    			"business": false,
    			"public_key": false,
    			"message": "this is a message 1"
    		}
    	];

    	let processed_messages = [];

    	let message_selected = {
    		"name": 'Admin',
    		"subject": "Hello From copious.world",
    		"date": today,
    		"readers": "you",
    		"business": false,
    		"public_key": false
    	};

    	let message_edit_list_name = "";
    	let message_edit_list = [];
    	let message_edit_source = false;

    	function reinitialize_user_context() {
    		$$invalidate(0, active_cid = "");
    		clear_cid = "";
    		dir_view = false;
    		$$invalidate(9, signup_status = "OK");

    		//
    		start_of_messages = 0;

    		messages_per_page = 100;

    		//
    		$$invalidate(7, active_profile_image = "");

    		//
    		$$invalidate(28, prefix = '');

    		$$invalidate(29, man_prefix = '');
    		$$invalidate(30, i = 0);
    		c_i = 0;
    		i_i = 0;
    		p_i = 0;
    		form_index = 0;

    		//
    		$$invalidate(31, c_name = '');

    		$$invalidate(32, c_DOB = '');
    		$$invalidate(33, c_place_of_origin = '');
    		$$invalidate(34, c_cool_public_info = '');
    		c_business = false;
    		c_public_key = "testesttesttest";
    		c_signer_public_key = "testesttesttest";
    		c_cid = "testesttesttest";
    		c_answer_message = '';
    		c_empty_fields = false;

    		//
    		today = new Date().toUTCString();

    		adding_new = false;
    		$$invalidate(37, manifest_selected_entry = false);
    		manifest_selected_form = false;
    		$$invalidate(38, manifest_contact_form_list = [false]);
    		$$invalidate(39, manifest_obj = {});
    		$$invalidate(40, manifest_index = 0);
    		man_title = '';
    		$$invalidate(41, man_cid = '');
    		man_wrapped_key = '';
    		man_html = '';
    		man_max_preference = 1.0;
    		man_preference = 1.0;
    		man_encrypted = false;
    		first_message = 0;
    		$$invalidate(16, green = false); // an indicator telling if this user ID is set
    		todays_date = new Date().toLocaleString();

    		$$invalidate(43, individuals = [
    			{
    				"name": 'Hans Solo',
    				"DOB": "1000",
    				"place_of_origin": "alpha centauri",
    				"cool_public_info": "He is a Master Jedi",
    				"business": false,
    				"public_key": "testesttesttest",
    				"signer_public_key": "ha ha ha ha ha ha ha ",
    				"cid": "4504385938",
    				"answer_message": "",
    				"biometric": "53535"
    			}
    		]);

    		cid_individuals_map = {};

    		inbound_solicitation_messages = [
    			{
    				"name": 'Darth Vadar',
    				"user_cid": "869968609",
    				"subject": "Hans Solo is Mean",
    				"date": todays_date,
    				"readers": "luke,martha,chewy",
    				"business": false,
    				"public_key": false,
    				"message": "this is a message 4",
    				"reply_with": "default"
    			}
    		];

    		inbound_contact_messages = [
    			{
    				"name": 'Hans Solo',
    				"user_cid": "4504385938",
    				"subject": "Darth Vadier Attacks",
    				"date": todays_date,
    				"readers": "joe,jane,harry",
    				"business": false,
    				"public_key": false,
    				"message": "this is a message 1"
    			}
    		];

    		processed_messages = [];

    		message_selected = {
    			"name": 'Admin',
    			"subject": "Hello From copious.world",
    			"date": today,
    			"readers": "you",
    			"business": false,
    			"public_key": false
    		};

    		update_selected_form_links();
    	}

    	/*
          "wrapped_key" : false,
          "encoding" : "uri",
      "when"  ... whereas"date" is a human readable string...
    */
    	//
    	class Contact {
    		//
    		constructor() {
    			this.empty_identity = {
    				"name": '',
    				"DOB": "",
    				"place_of_origin": "",
    				"cool_public_info": "",
    				"business": false,
    				"public_key": false,
    				"signer_public_key": false,
    				"biometric": false
    			};

    			this.data = this.empty_identity;
    		}

    		//
    		set(name, DOB, place_of_origin, cool_public_info, business, public_key, signer_public_key, biometric_blob) {
    			let user_data = {
    				name,
    				DOB,
    				place_of_origin,
    				cool_public_info,
    				"business": business === undefined ? false : business,
    				public_key,
    				signer_public_key,
    				"biometric": biometric_blob
    			};

    			this.data = user_data;
    		}

    		copy(contact_info) {
    			let data = {};

    			for (let ky in this.empty_identity) {
    				data[ky] = contact_info[ky];
    			}

    			this.data = data;
    		}

    		match(contact_info) {
    			let f_match = true;
    			f_match = f_match && this.data.name === contact_info.name;
    			f_match = f_match && this.data.DOB === contact_info.DOB;
    			f_match = f_match && this.data.place_of_origin === contact_info.place_of_origin;
    			f_match = f_match && this.data.cool_public_info === contact_info.cool_public_info;
    			f_match = f_match && this.data.business === contact_info.business;
    			return f_match;
    		}

    		extend_contact(field, value) {
    			this.data[field] = value;
    		}

    		get_field(field) {
    			return this.data[field];
    		}

    		identity() {
    			let id_obj = Object.assign(this.empty_identity, this.data);
    			return id_obj;
    		}

    		clear_identity() {
    			let id_obj = {
    				"name": this.data.name,
    				"DOB": this.data.DOB,
    				"place_of_origin": this.data.place_of_origin,
    				"cool_public_info": this.data.cool_public_info,
    				"business": this.data.business
    			};

    			return id_obj;
    		}
    	}

    	let empty_identity = new Contact();
    	let current_index = -1;

    	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    	let creator_disabled = false;

    	let creation_to_do = false;
    	let window_scale = { "w": 0.4, "h": 0.8 };
    	let edit_popup_scale = { "w": 0.45, "h": 0.3 };
    	let all_window_scales = [];
    	all_window_scales.push(window_scale);
    	all_window_scales.push(window_scale);
    	all_window_scales.push(edit_popup_scale);

    	//
    	window_scale = popup_size();

    	all_window_scales[0] = window_scale;
    	all_window_scales[1] = window_scale;

    	//
    	onMount(async () => {
    		//
    		window.addEventListener("resize", e => {
    			//
    			let scale = popup_size();

    			//
    			window_scale.h = scale.h;

    			window_scale.w = scale.w;
    			all_window_scales[0] = window_scale;
    			all_window_scales[1] = window_scale;
    		}); //

    		await startup();

    		// initialize
    		await get_active_users(); // updates login page and initializes the view of this user.
    	});

    	async function update_selected_form_link(type) {
    		let form_link = selected_form_link_types[type];

    		if (!form_link.from_cid) {
    			let template_name = form_link.link;
    			let cid = await get_named_contact_template_cid(template_name, type);
    			form_link.from_cid = cid;
    		}
    	}

    	async function update_selected_form_links() {
    		await update_selected_form_link("profile");
    		await update_selected_form_link("business");
    	}

    	// PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE 
    	// PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE  PROFILE 
    	let g_required_user_fields = ["name", "DOB", "place_of_origin", "cool_public_info", "biometric"];

    	let g_renamed_user_fields = {
    		"DOB": "Year of inception",
    		"place_of_origin": "Main Office"
    	};

    	let g_last_inspected_field = false;

    	function check_required_fields(object, required_fields) {
    		g_last_inspected_field = false;

    		for (let field of required_fields) {
    			let value = object[field];
    			g_last_inspected_field = field;
    			if (value === undefined || value.length === 0) return false;
    		}

    		return true;
    	}

    	function missing_fields(activity, app_rename, do_rename) {
    		let l_field = g_last_inspected_field;

    		// 
    		if (do_rename) {
    			let r_field = app_rename[l_field];

    			if (r_field) {
    				l_field = r_field;
    			}
    		}

    		let message = `Missing field: ${l_field},  when ${activity}`;
    		return message;
    	}

    	async function create_intergalactic_id() {
    		let contact = new Contact(); // contact of self... Stores the same info as a contact plus some special fields for local db
    		contact.set(name, DOB, place_of_origin, cool_public_info, business, false, false, biometric_blob);

    		//
    		selected_form_link = selected_form_link_types[business ? "business" : "profile"];

    		contact.extend_contact("form_link", selected_form_link);
    		contact.extend_contact("answer_message", "");

    		//
    		let user_data = contact.identity();

    		//
    		$$invalidate(9, signup_status = "OK");

    		if (!check_required_fields(user_data, g_required_user_fields)) {
    			$$invalidate(9, signup_status = missing_fields("creating contact page", g_renamed_user_fields, business));
    			return;
    		}

    		await gen_public_key(user_data, store_user); // by ref  // stores keys in DB  // converts biometric to signature (calls protect_hash)

    		try {
    			$$invalidate(16, green = await add_user_locally(user_data)); // will fetch the key (it is not riding along yet.)
    		} catch(e) {
    			
    		}

    		//
    		await get_active_users(); // updates login page and initializes the view of this user.

    		$$invalidate(6, u_index = known_users.length - 1); // user was added to the end...
    	}

    	async function load_user_info(identity) {
    		$$invalidate(0, active_cid = identity.cid); // changes to a ucwid
    		clear_cid = identity.clear_cid;

    		//
    		await fix_keys(identity);

    		//
    		if (identity.profile_image) {
    			let img_cid = identity.profile_image;
    			$$invalidate(7, active_profile_image = await window.load_blob_as_url(img_cid));
    		}
    	}

    	async function get_active_users() {
    		try {
    			let known_user_lists = await window.get_known_users();
    			$$invalidate(3, known_users = known_user_lists[0]);
    			$$invalidate(36, known_identities = known_user_lists[1]);
    		} catch(e) {
    			
    		}
    	}

    	function clear_identify_form() {
    		$$invalidate(1, name = '');
    		$$invalidate(10, DOB = '');
    		$$invalidate(11, place_of_origin = '');
    		$$invalidate(12, cool_public_info = '');
    		biometric_blob = '';
    		$$invalidate(13, business = false);
    		$$invalidate(2, active_user = false);
    		$$invalidate(35, active_identity = false);
    		$$invalidate(6, u_index = false);
    		adding_new = true;
    	}

    	async function remove_identify_seen_in_form() {
    		let identity = active_identity;
    		const index = known_users.indexOf(active_user);

    		if (index >= 0) {
    			$$invalidate(3, known_users = [...known_users.slice(0, index), ...known_users.slice(index + 1)]);
    			$$invalidate(6, u_index = Math.min(u_index, known_users.length - 1));
    			await unstore_user(identity);
    		}
    	}

    	async function drop_picture(ev) {
    		ev.preventDefault();

    		try {
    			let files = ev.dataTransfer.files ? ev.dataTransfer.files : false;
    			let items = ev.dataTransfer.items ? ev.dataTransfer.items : false;
    			let [fname, blob64] = await drop(items, files);

    			//
    			fname = `images/contact`;

    			let identity = active_identity;

    			if (identity) {
    				$$invalidate(7, active_profile_image = blob64);

    				//
    				//				use window injected methods to store images in th IndexedDB record of the user
    				let fcid = await user_info_add_picture(fname, blob64);

    				if (fcid) {
    					identity.profile_image = fcid;
    					await update_identity(identity);
    				}
    			}
    		} catch(e) {
    			console.log(e);
    		}
    	}

    	async function drop_biometric(ev) {
    		ev.preventDefault();

    		try {
    			let files = ev.dataTransfer.files ? ev.dataTransfer.files : false;
    			let items = ev.dataTransfer.items ? ev.dataTransfer.items : false;
    			let [fname, blob64] = await drop(items, files);
    			biometric_blob = blob64;
    			$$invalidate(8, src_biometric_instruct = "Biometric has been dropped.");
    		} catch(e) {
    			console.log(e); //
    		}
    	}

    	// MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES
    	// MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES MESSAGES
    	// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    	//
    	function reset_inputs(individual) {
    		$$invalidate(31, c_name = individual ? individual.name : '');
    		$$invalidate(32, c_DOB = individual ? individual.DOB : '');
    		$$invalidate(33, c_place_of_origin = individual ? individual.place_of_origin : '');
    		$$invalidate(34, c_cool_public_info = individual ? individual.cool_public_info : '');
    		c_business = individual ? individual.business : '';
    		c_public_key = individual ? individual.public_key : '';
    		c_signer_public_key = individual ? individual.signer_public_key : '';
    		c_answer_message = individual ? individual.answer_message : '';
    		c_cid = individual ? individual.cid : '';
    	}

    	async function app_upload_identity() {
    		await upload_identity();
    		await get_active_users(); // updates login page and initializes the view of this user.
    		$$invalidate(6, u_index = known_users.length - 1); // user was added to the end...
    	}

    	async function app_download_identity() {
    		if (active_identity) {
    			let user_info = active_identity.user_info;
    			await download_identity(user_info, false);
    		}
    	}

    	function navigate_to_user(e) {
    		$$invalidate(4, active = 'User');
    	}

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function tabbar_active_binding(value) {
    		active = value;
    		$$invalidate(4, active);
    	}

    	function select_change_handler() {
    		u_index = select_value(this);
    		$$invalidate(6, u_index);
    	}

    	function input0_input_handler() {
    		name = this.value;
    		((($$invalidate(1, name), $$invalidate(2, active_user)), $$invalidate(3, known_users)), $$invalidate(6, u_index));
    	}

    	function input1_change_handler() {
    		business = this.checked;
    		((($$invalidate(13, business), $$invalidate(2, active_user)), $$invalidate(3, known_users)), $$invalidate(6, u_index));
    	}

    	function input_input_handler() {
    		DOB = this.value;
    		((($$invalidate(10, DOB), $$invalidate(2, active_user)), $$invalidate(3, known_users)), $$invalidate(6, u_index));
    	}

    	function input_input_handler_1() {
    		DOB = this.value;
    		((($$invalidate(10, DOB), $$invalidate(2, active_user)), $$invalidate(3, known_users)), $$invalidate(6, u_index));
    	}

    	function input_input_handler_2() {
    		place_of_origin = this.value;
    		((($$invalidate(11, place_of_origin), $$invalidate(2, active_user)), $$invalidate(3, known_users)), $$invalidate(6, u_index));
    	}

    	function input_input_handler_3() {
    		place_of_origin = this.value;
    		((($$invalidate(11, place_of_origin), $$invalidate(2, active_user)), $$invalidate(3, known_users)), $$invalidate(6, u_index));
    	}

    	function textarea_input_handler() {
    		cool_public_info = this.value;
    		((($$invalidate(12, cool_public_info), $$invalidate(2, active_user)), $$invalidate(3, known_users)), $$invalidate(6, u_index));
    	}

    	function img_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			biometric_data_el = $$value;
    			$$invalidate(15, biometric_data_el);
    		});
    	}

    	function img_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			profile_image_el = $$value;
    			$$invalidate(14, profile_image_el);
    		});
    	}

    	$$self.$capture_state = () => ({
    		Tab,
    		Label: CommonLabel,
    		TabBar,
    		onMount,
    		ipfs_profiles,
    		utils,
    		active_profile_image,
    		active_profile_biometric,
    		src_1_name,
    		src_biometric_instruct,
    		active_cid,
    		clear_cid,
    		dir_view,
    		signup_status,
    		start_of_messages,
    		messages_per_page,
    		prefix,
    		man_prefix,
    		i,
    		c_i,
    		i_i,
    		p_i,
    		form_index,
    		name,
    		DOB,
    		place_of_origin,
    		cool_public_info,
    		business,
    		biometric_blob,
    		c_name,
    		c_DOB,
    		c_place_of_origin,
    		c_cool_public_info,
    		c_business,
    		c_public_key,
    		c_signer_public_key,
    		c_cid,
    		c_answer_message,
    		c_biometric_blob,
    		c_empty_fields,
    		today,
    		active_user,
    		active_identity,
    		known_users,
    		known_identities,
    		u_index,
    		adding_new,
    		manifest_selected_entry,
    		manifest_selected_form,
    		manifest_contact_form_list,
    		manifest_obj,
    		manifest_index,
    		man_title,
    		man_cid,
    		man_wrapped_key,
    		man_html,
    		man_max_preference,
    		man_preference,
    		man_sel_not_customized,
    		man_contact_is_default,
    		man_encrypted,
    		message_edit_from_contact,
    		profile_image_el,
    		biometric_data_el,
    		active,
    		prev_active,
    		first_message,
    		green,
    		todays_date,
    		filtered_cc_list,
    		message_op_category,
    		source_category,
    		processed_category,
    		selected_form_link_types,
    		selected_form_link,
    		individuals,
    		cid_individuals_map,
    		selected,
    		inbound_solicitation_messages,
    		inbound_contact_messages,
    		processed_messages,
    		message_selected,
    		message_edit_list_name,
    		message_edit_list,
    		message_edit_source,
    		reinitialize_user_context,
    		Contact,
    		empty_identity,
    		current_index,
    		creator_disabled,
    		creation_to_do,
    		window_scale,
    		edit_popup_scale,
    		all_window_scales,
    		popup_size,
    		update_selected_form_link,
    		update_selected_form_links,
    		g_required_user_fields,
    		g_renamed_user_fields,
    		g_last_inspected_field,
    		check_required_fields,
    		missing_fields,
    		create_intergalactic_id,
    		load_user_info,
    		get_active_users,
    		clear_identify_form,
    		remove_identify_seen_in_form,
    		drop_picture,
    		drop_biometric,
    		dragover_picture,
    		reset_inputs,
    		app_upload_identity,
    		app_download_identity,
    		navigate_to_user,
    		filtered_manifest_contact_form_list,
    		filteredIndviduals
    	});

    	$$self.$inject_state = $$props => {
    		if ('active_profile_image' in $$props) $$invalidate(7, active_profile_image = $$props.active_profile_image);
    		if ('active_profile_biometric' in $$props) $$invalidate(18, active_profile_biometric = $$props.active_profile_biometric);
    		if ('src_1_name' in $$props) $$invalidate(19, src_1_name = $$props.src_1_name);
    		if ('src_biometric_instruct' in $$props) $$invalidate(8, src_biometric_instruct = $$props.src_biometric_instruct);
    		if ('active_cid' in $$props) $$invalidate(0, active_cid = $$props.active_cid);
    		if ('clear_cid' in $$props) clear_cid = $$props.clear_cid;
    		if ('dir_view' in $$props) dir_view = $$props.dir_view;
    		if ('signup_status' in $$props) $$invalidate(9, signup_status = $$props.signup_status);
    		if ('start_of_messages' in $$props) start_of_messages = $$props.start_of_messages;
    		if ('messages_per_page' in $$props) messages_per_page = $$props.messages_per_page;
    		if ('prefix' in $$props) $$invalidate(28, prefix = $$props.prefix);
    		if ('man_prefix' in $$props) $$invalidate(29, man_prefix = $$props.man_prefix);
    		if ('i' in $$props) $$invalidate(30, i = $$props.i);
    		if ('c_i' in $$props) c_i = $$props.c_i;
    		if ('i_i' in $$props) i_i = $$props.i_i;
    		if ('p_i' in $$props) p_i = $$props.p_i;
    		if ('form_index' in $$props) form_index = $$props.form_index;
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('DOB' in $$props) $$invalidate(10, DOB = $$props.DOB);
    		if ('place_of_origin' in $$props) $$invalidate(11, place_of_origin = $$props.place_of_origin);
    		if ('cool_public_info' in $$props) $$invalidate(12, cool_public_info = $$props.cool_public_info);
    		if ('business' in $$props) $$invalidate(13, business = $$props.business);
    		if ('biometric_blob' in $$props) biometric_blob = $$props.biometric_blob;
    		if ('c_name' in $$props) $$invalidate(31, c_name = $$props.c_name);
    		if ('c_DOB' in $$props) $$invalidate(32, c_DOB = $$props.c_DOB);
    		if ('c_place_of_origin' in $$props) $$invalidate(33, c_place_of_origin = $$props.c_place_of_origin);
    		if ('c_cool_public_info' in $$props) $$invalidate(34, c_cool_public_info = $$props.c_cool_public_info);
    		if ('c_business' in $$props) c_business = $$props.c_business;
    		if ('c_public_key' in $$props) c_public_key = $$props.c_public_key;
    		if ('c_signer_public_key' in $$props) c_signer_public_key = $$props.c_signer_public_key;
    		if ('c_cid' in $$props) c_cid = $$props.c_cid;
    		if ('c_answer_message' in $$props) c_answer_message = $$props.c_answer_message;
    		if ('c_biometric_blob' in $$props) c_biometric_blob = $$props.c_biometric_blob;
    		if ('c_empty_fields' in $$props) c_empty_fields = $$props.c_empty_fields;
    		if ('today' in $$props) today = $$props.today;
    		if ('active_user' in $$props) $$invalidate(2, active_user = $$props.active_user);
    		if ('active_identity' in $$props) $$invalidate(35, active_identity = $$props.active_identity);
    		if ('known_users' in $$props) $$invalidate(3, known_users = $$props.known_users);
    		if ('known_identities' in $$props) $$invalidate(36, known_identities = $$props.known_identities);
    		if ('u_index' in $$props) $$invalidate(6, u_index = $$props.u_index);
    		if ('adding_new' in $$props) adding_new = $$props.adding_new;
    		if ('manifest_selected_entry' in $$props) $$invalidate(37, manifest_selected_entry = $$props.manifest_selected_entry);
    		if ('manifest_selected_form' in $$props) manifest_selected_form = $$props.manifest_selected_form;
    		if ('manifest_contact_form_list' in $$props) $$invalidate(38, manifest_contact_form_list = $$props.manifest_contact_form_list);
    		if ('manifest_obj' in $$props) $$invalidate(39, manifest_obj = $$props.manifest_obj);
    		if ('manifest_index' in $$props) $$invalidate(40, manifest_index = $$props.manifest_index);
    		if ('man_title' in $$props) man_title = $$props.man_title;
    		if ('man_cid' in $$props) $$invalidate(41, man_cid = $$props.man_cid);
    		if ('man_wrapped_key' in $$props) man_wrapped_key = $$props.man_wrapped_key;
    		if ('man_html' in $$props) man_html = $$props.man_html;
    		if ('man_max_preference' in $$props) man_max_preference = $$props.man_max_preference;
    		if ('man_preference' in $$props) man_preference = $$props.man_preference;
    		if ('man_sel_not_customized' in $$props) man_sel_not_customized = $$props.man_sel_not_customized;
    		if ('man_contact_is_default' in $$props) man_contact_is_default = $$props.man_contact_is_default;
    		if ('man_encrypted' in $$props) man_encrypted = $$props.man_encrypted;
    		if ('message_edit_from_contact' in $$props) message_edit_from_contact = $$props.message_edit_from_contact;
    		if ('profile_image_el' in $$props) $$invalidate(14, profile_image_el = $$props.profile_image_el);
    		if ('biometric_data_el' in $$props) $$invalidate(15, biometric_data_el = $$props.biometric_data_el);
    		if ('active' in $$props) $$invalidate(4, active = $$props.active);
    		if ('prev_active' in $$props) $$invalidate(42, prev_active = $$props.prev_active);
    		if ('first_message' in $$props) first_message = $$props.first_message;
    		if ('green' in $$props) $$invalidate(16, green = $$props.green);
    		if ('todays_date' in $$props) todays_date = $$props.todays_date;
    		if ('filtered_cc_list' in $$props) filtered_cc_list = $$props.filtered_cc_list;
    		if ('message_op_category' in $$props) message_op_category = $$props.message_op_category;
    		if ('source_category' in $$props) source_category = $$props.source_category;
    		if ('processed_category' in $$props) processed_category = $$props.processed_category;
    		if ('selected_form_link_types' in $$props) selected_form_link_types = $$props.selected_form_link_types;
    		if ('selected_form_link' in $$props) selected_form_link = $$props.selected_form_link;
    		if ('individuals' in $$props) $$invalidate(43, individuals = $$props.individuals);
    		if ('cid_individuals_map' in $$props) cid_individuals_map = $$props.cid_individuals_map;
    		if ('selected' in $$props) $$invalidate(44, selected = $$props.selected);
    		if ('inbound_solicitation_messages' in $$props) inbound_solicitation_messages = $$props.inbound_solicitation_messages;
    		if ('inbound_contact_messages' in $$props) inbound_contact_messages = $$props.inbound_contact_messages;
    		if ('processed_messages' in $$props) processed_messages = $$props.processed_messages;
    		if ('message_selected' in $$props) message_selected = $$props.message_selected;
    		if ('message_edit_list_name' in $$props) message_edit_list_name = $$props.message_edit_list_name;
    		if ('message_edit_list' in $$props) message_edit_list = $$props.message_edit_list;
    		if ('message_edit_source' in $$props) message_edit_source = $$props.message_edit_source;
    		if ('empty_identity' in $$props) $$invalidate(108, empty_identity = $$props.empty_identity);
    		if ('current_index' in $$props) $$invalidate(45, current_index = $$props.current_index);
    		if ('creator_disabled' in $$props) $$invalidate(17, creator_disabled = $$props.creator_disabled);
    		if ('creation_to_do' in $$props) $$invalidate(5, creation_to_do = $$props.creation_to_do);
    		if ('window_scale' in $$props) window_scale = $$props.window_scale;
    		if ('edit_popup_scale' in $$props) edit_popup_scale = $$props.edit_popup_scale;
    		if ('all_window_scales' in $$props) all_window_scales = $$props.all_window_scales;
    		if ('g_required_user_fields' in $$props) g_required_user_fields = $$props.g_required_user_fields;
    		if ('g_renamed_user_fields' in $$props) g_renamed_user_fields = $$props.g_renamed_user_fields;
    		if ('g_last_inspected_field' in $$props) g_last_inspected_field = $$props.g_last_inspected_field;
    		if ('filtered_manifest_contact_form_list' in $$props) $$invalidate(46, filtered_manifest_contact_form_list = $$props.filtered_manifest_contact_form_list);
    		if ('filteredIndviduals' in $$props) $$invalidate(47, filteredIndviduals = $$props.filteredIndviduals);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*prefix*/ 268435456 | $$self.$$.dirty[1] & /*individuals*/ 4096) {
    			//
    			// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    			$$invalidate(47, filteredIndviduals = prefix
    			? individuals.filter(individual => {
    					const name = `${individual.name}`;
    					return name.toLowerCase().startsWith(prefix.toLowerCase());
    				})
    			: individuals);
    		}

    		if ($$self.$$.dirty[0] & /*i*/ 1073741824 | $$self.$$.dirty[1] & /*filteredIndviduals*/ 65536) {
    			$$invalidate(44, selected = i >= 0
    			? filteredIndviduals[i]
    			: empty_identity.identity());
    		}

    		if ($$self.$$.dirty[1] & /*selected*/ 8192) {
    			reset_inputs(selected);
    		}

    		if ($$self.$$.dirty[0] & /*u_index*/ 64 | $$self.$$.dirty[1] & /*known_identities*/ 32) {
    			$$invalidate(35, active_identity = known_identities[u_index]);
    		}

    		if ($$self.$$.dirty[1] & /*active_identity, individuals*/ 4112) {
    			if (active_identity) {
    				filtered_cc_list = individuals.filter(ident => {
    					if (ident.cid !== active_identity.cid) {
    						return true;
    					}

    					return false;
    				});
    			}
    		}

    		if ($$self.$$.dirty[0] & /*known_users, u_index*/ 72) {
    			//
    			//
    			$$invalidate(2, active_user = known_users[u_index]);
    		}

    		if ($$self.$$.dirty[1] & /*active_identity*/ 16) {
    			$$invalidate(16, green = active_identity
    			? active_identity.stored_externally
    			: false);
    		}

    		if ($$self.$$.dirty[0] & /*active_user*/ 4) {
    			{
    				if (active_user) {
    					window.set_user_title(active_user.name);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*active_user*/ 4) {
    			{
    				if (active_user !== undefined && active_user) {
    					$$invalidate(1, name = active_user.name);
    					$$invalidate(10, DOB = active_user.DOB);
    					$$invalidate(11, place_of_origin = active_user.place_of_origin);
    					$$invalidate(12, cool_public_info = active_user.cool_public_info);
    					$$invalidate(13, business = active_user.business);
    					adding_new = false;
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*u_index*/ 64 | $$self.$$.dirty[1] & /*current_index, active_identity*/ 16400) {
    			{
    				if (current_index !== u_index) {
    					$$invalidate(45, current_index = u_index);
    					reinitialize_user_context();
    				}

    				if (active_identity) {
    					load_user_info(active_identity);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*man_prefix*/ 536870912 | $$self.$$.dirty[1] & /*manifest_contact_form_list*/ 128) {
    			$$invalidate(46, filtered_manifest_contact_form_list = man_prefix
    			? manifest_contact_form_list.filter(man_contact => {
    					const name = `${man_contact.name}`;
    					return name.toLowerCase().startsWith(man_prefix.toLowerCase());
    				})
    			: manifest_contact_form_list);
    		}

    		if ($$self.$$.dirty[1] & /*filtered_manifest_contact_form_list, manifest_index, manifest_selected_entry, manifest_obj, man_cid*/ 34624) {
    			{
    				$$invalidate(37, manifest_selected_entry = filtered_manifest_contact_form_list[manifest_index]);

    				if (manifest_selected_entry !== undefined && manifest_selected_entry) {
    					manifest_selected_form = manifest_selected_entry.html;
    					man_title = manifest_selected_entry.info;
    					man_max_preference = manifest_obj.max_preference;
    					man_preference = manifest_selected_entry.preference;
    					$$invalidate(41, man_cid = manifest_selected_entry.cid);
    					man_contact_is_default = man_cid === manifest_obj.default_contact_form;
    				}
    			}
    		}

    		if ($$self.$$.dirty[1] & /*c_name, c_DOB, c_place_of_origin, c_cool_public_info*/ 15) {
    			c_empty_fields = !c_name || c_name.length == 0 || (!c_DOB || c_DOB.length == 0) || (!c_place_of_origin || c_place_of_origin.length == 0) || c_cool_public_info.length == 0;
    		}

    		if ($$self.$$.dirty[0] & /*active*/ 16 | $$self.$$.dirty[1] & /*prev_active*/ 2048) {
    			{
    				if (prev_active !== active) {
    					message_edit_list = [];
    					message_edit_source = false;

    					if (active == "Introductions") {
    						message_op_category = "intros";
    					} else if (active == "Messages") {
    						message_op_category = "messages";
    					}
    				}

    				$$invalidate(42, prev_active = active);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*u_index, active_user, active_cid, creation_to_do*/ 101) {
    			{
    				$$invalidate(5, creation_to_do = u_index === false || active_user && active_user.biometric === undefined);

    				if (typeof active_cid === "string" && active_cid.length === 0) {
    					$$invalidate(5, creation_to_do = true);
    				}

    				$$invalidate(17, creator_disabled = !creation_to_do);
    				console.log(active_cid);
    			}
    		}
    	};

    	return [
    		active_cid,
    		name,
    		active_user,
    		known_users,
    		active,
    		creation_to_do,
    		u_index,
    		active_profile_image,
    		src_biometric_instruct,
    		signup_status,
    		DOB,
    		place_of_origin,
    		cool_public_info,
    		business,
    		profile_image_el,
    		biometric_data_el,
    		green,
    		creator_disabled,
    		active_profile_biometric,
    		src_1_name,
    		create_intergalactic_id,
    		clear_identify_form,
    		remove_identify_seen_in_form,
    		drop_picture,
    		drop_biometric,
    		app_upload_identity,
    		app_download_identity,
    		navigate_to_user,
    		prefix,
    		man_prefix,
    		i,
    		c_name,
    		c_DOB,
    		c_place_of_origin,
    		c_cool_public_info,
    		active_identity,
    		known_identities,
    		manifest_selected_entry,
    		manifest_contact_form_list,
    		manifest_obj,
    		manifest_index,
    		man_cid,
    		prev_active,
    		individuals,
    		selected,
    		current_index,
    		filtered_manifest_contact_form_list,
    		filteredIndviduals,
    		tabbar_active_binding,
    		select_change_handler,
    		input0_input_handler,
    		input1_change_handler,
    		input_input_handler,
    		input_input_handler_1,
    		input_input_handler_2,
    		input_input_handler_3,
    		textarea_input_handler,
    		img_binding,
    		img_binding_1
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1, -1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.getElementById('app-main'),
    	props: {
    		name: 'My Blog With Grid'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
