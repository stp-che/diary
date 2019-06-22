

import React from "react";
import isPlainObject from "lodash/isPlainObject";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import * as Rx from 'rxjs';
import { of, scan, debounce } from 'rxjs/operators';

const DEFAULT_OPTIONS = {
    noDebounce: false
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
function isObservable(obj) {
    if (!obj) {
        return false;
    }

    return Rx.isObservable(obj);
}

export default function rxConnect(selector, options = DEFAULT_OPTIONS) {
    return WrappedComponent => class RxConnector extends React.PureComponent {

        static displayName = "RxConnector";

        stateSubscription = undefined;

        shouldDebounce = false;

        subProps = {};

        constructor(props) {
            super(props);

            this.props$ = new Rx.BehaviorSubject(props);
        }

        componentWillMount() {
            this.shouldDebounce = false;

            let mutations$ = selector;
            if(!isObservable(mutations$)) {
                if (typeof selector === 'function') {
                    mutations$ = selector(this.props$);
                } else {
                    // eslint-disable-next-line no-console
                    console.error(`Selector must be a function or an Observable. Check rxConnect of ${getDisplayName(WrappedComponent)}. Got: `, selector);
                    return;
                }
            }

            if(!isObservable(mutations$)) {
                    // eslint-disable-next-line no-undef
                if (mutations$ && typeof mutations$[Symbol.iterator] === 'function') {
                    mutations$ = Rx.Observable.merge(...mutations$);
                } else {
                    // eslint-disable-next-line no-console
                    console.error(`Selector must return an Observable or an iterator of observables. Check rxConnect of ${getDisplayName(WrappedComponent)}. Got: `, mutations$);
                    return;
                }
            }

            this.stateSubscription = mutations$.pipe(
                    scan((state, mutation) => {
                        if (typeof mutation === "function") {
                            return mutation(state);
                        }

                        if (isPlainObject(mutation)) {
                            return Object.assign({}, state, mutation);
                        }

                        if (isObject(mutation) && !isArray(mutation)) {
                            return Object.assign({}, state, {...mutation});
                        }

                        // eslint-disable-next-line no-console
                        console.error(`Mutation must be a plain object or function. Check rxConnect of ${getDisplayName(WrappedComponent)}. Got: `, mutation);
                        return state;
                    }, {}),
                    debounce(() => (!options.noDebounce && this.shouldDebounce) ? Rx.interval(0) : Rx.of())
                ).subscribe(state => {
                    this.subProps = state;
                    this.forceUpdate();
                });
        }

        componentDidMount() {
            this.shouldDebounce = true;
        }

        componentWillUnmount() {
            this.stateSubscription.unsubscribe();
        }

        componentWillReceiveProps(nextProps) {
            this.props$.next(nextProps);
        }

        render() {
            return React.createElement(WrappedComponent, this.subProps, this.props.children);
        }
    };
}

