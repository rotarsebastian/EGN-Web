import { Injectable, Inject } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

const keys = {
  token: 'egn_web_token',
  socketId: 'egn_web_socketId',
  groupSubpage: 'egn_web_groupSubpage',
  lastGroupVisited: 'egn_web_lastGroupVisited',
  groupActions: 'egn_web_groupActions',
};

Injectable();
export class StorageService {

  constructor( @Inject(LocalStorageService) private localStorage: LocalStorageService ) { }

  clear() { this.localStorage.clear(); }

  private save(key: string, object: any): void { this.localStorage.store(key, object); }
  private get(key: string): any { return this.localStorage.retrieve(key); }

  get token(): any { return this.get(keys.token); }
  set token(token: any) { this.save(keys.token, token); }

  get socketId(): any { return this.get(keys.socketId); }
  set socketId(socketId: any) { this.save(keys.socketId, socketId); }

  get groupSubpage(): number { return this.get(keys.groupSubpage); }
  set groupSubpage(groupSubpage: number) { this.save(keys.groupSubpage, groupSubpage); }

  get lastGroupVisited(): number { return this.get(keys.lastGroupVisited); }
  set lastGroupVisited(lastGroupVisited: number) { this.save(keys.lastGroupVisited, lastGroupVisited); }

  get groupActions(): string[] { return this.get(keys.groupActions); }
  set groupActions(groupActions: string[] ) { this.save(keys.groupActions, groupActions); }
}
