import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

beforeAll(async () => {
  await resolveComponentResources(() => Promise.resolve(new Response('')));
});

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);