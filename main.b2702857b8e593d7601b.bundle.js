(()=>{"use strict";var e,t={769:(e,t,i)=>{i(440);class s extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(10016391),this.createLoadingbar(),this.load.on("progress",(e=>{this.progressBar.clear(),this.progressBar.fillStyle(16774867,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()})),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("GameScene")}createLoadingbar(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(6139463,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}let r={score:0,highscore:0,gridWidth:8,gridHeight:8,tileWidth:64,tileHeight:64,candyTypes:["reimu","marisa","cirno","remilia","sakuya"]};class l extends Phaser.GameObjects.Sprite{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.setOrigin(0,0),this.setInteractive(),this.setDepth(1),this.anims.create({key:"idle",frames:this.anims.generateFrameNumbers(e.texture,{start:4,end:5}),frameRate:3,repeat:-1}),this.anims.create({key:"selected",frames:this.anims.generateFrameNumbers(e.texture,{start:36,end:37}),frameRate:3,repeat:-1}),this.anims.create({key:"spin",frames:this.anims.generateFrameNumbers(this.texture.key,{frames:[4,12,0,8]}),frameRate:8,repeat:-1}),this.play("idle"),this.scene.add.existing(this)}}class n extends l{constructor(e,t){super(e),this.special=t,this.init()}init(){}}class a{constructor(e,t,i){this.scene=e,this.tileGrid=t,this.backGrid=i,this.tileHighlight=[]}transitionTileGrid(){for(let e=0;e<this.tileGrid.length;e++)for(let t=0;t<this.tileGrid[e].length;t++)this.scene.tweens.add({targets:this.tileGrid[e][t],x:224,y:224,ease:"Sine.easeInOut",duration:500,repeat:0,delay:30*e+20*t}).on("complete",(()=>{e===this.tileGrid.length-1&&t===this.tileGrid[e].length-1&&this.spinCicle()}))}idleTileGrid(){for(let e=0;e<this.tileGrid.length;e++)for(let t=0;t<this.tileGrid[e].length;t++)this.scene.tweens.add({targets:this.tileGrid[e][t],rotation:.1,ease:"sine.inout",duration:200,delay:50*e,repeat:0,yoyo:!0}).on("complete",(()=>{e===this.tileGrid.length-1&&t===this.tileGrid[e].length-1&&this.scene.events.emit("tileGridIdleComplete")}))}highlightTileGrid(e,t=0){if(e.x<0||e.x>=this.tileGrid.length||e.y<0||e.y>=this.tileGrid[0].length)return;let i=this.scene.add.particles(0,0,"cloud",{speed:15,lifespan:200,quantity:10,scale:{start:.2,end:0},emitZone:{type:"edge",source:this.backGrid[e.y][e.x].getBounds(),quantity:42},duration:t});0===t&&this.tileHighlight.push(i)}unhighlightTileGrid(){for(let e=0;e<this.tileHighlight.length;e++)this.tileHighlight[e].destroy()}spinCicle(){const e=new Phaser.Geom.Circle(224,224,192);Phaser.Actions.PlaceOnCircle(this.tileGrid.flat(1),e),this.launchConfetti(),this.scene.tweens.add({targets:e,scale:1,ease:"Cubic.easeInOut",duration:3e3,repeat:0,onUpdate:()=>{Phaser.Actions.RotateAroundDistance(this.tileGrid.flat(),e,.02,e.radius)}}).on("complete",(()=>{this.returnToGrid()}))}spinRectangle(){const e=new Phaser.Geom.Rectangle(32,32,384,384);Phaser.Actions.PlaceOnRectangle(this.tileGrid.flat(1),e);const t=e.x+e.width/2,i=e.y+e.height/2;let s=0;this.launchConfetti(),this.scene.tweens.add({targets:e,width:0,height:0,ease:"Cubic.easeInOut",duration:3e3,repeat:0,onUpdate:()=>{s+=.02,Phaser.Actions.RotateAroundDistance(this.tileGrid.flat(),{x:t,y:i},s,Math.max(e.width,e.height)/2)}}).on("complete",(()=>{this.returnToGrid()}))}returnToGrid(){for(let e=0;e<this.tileGrid.length;e++)for(let t=0;t<this.tileGrid[e].length;t++)this.scene.tweens.add({targets:this.tileGrid[e][t],x:t*r.tileWidth,y:e*r.tileHeight,ease:"Sine.easeInOut",duration:1e3,repeat:0,delay:50*e+100*t,yoyo:!1}).on("complete",(()=>{e===this.tileGrid.length-1&&t===this.tileGrid[e].length-1&&this.scene.events.emit("tileGridTransitionComplete")}))}launchConfetti(){this.scene.add.particles(254,254,"raster",{speedX:{min:-500,max:500},speedY:{min:-1600,max:-800},lifespan:5e3,gravityY:5e3,frame:[0,4,8,12,16],scaleX:{onEmit:e=>-1,onUpdate:e=>e.scaleX>1?-1:e.scaleX+.05},rotate:{onEmit:e=>0,onUpdate:e=>e.angle+1},duration:300,maxVelocityY:{onEmit:e=>-1600,onUpdate:e=>e.velocityY>=0?200:1600},quantity:3})}}class h{constructor(e){this.emitted=!1,this.scene=e,this.scene.events.on("update",this.update,this)}createTween(e){return this.emitted=!1,this.scene.tweens.add(e).pause()}startAllTweens(){0!==this.allTweens.length?this.allTweens.forEach((e=>{this.emitted=!1,e.play()})):this.scene.events.emit("tweensComplete")}get allTweens(){return this.scene.tweens.getTweens()}update(){0!==this.scene.tweens.getTweens().length||this.emitted||this.scene.events.emit("tweensComplete")}}class d{constructor(e,t,i,s,r){this.scene=e,this.effect=this.scene.add.sprite(t,i,s,r)}playEffect(){}}class o extends d{constructor(e,t,i,s){super(e,t,i,"stripe"),this.duration=300,this.direction=s,this.effect.setTint(16758501)}playEffect(){let e;switch(this.direction){case"up":this.effect.setRotation(Math.PI/2),e=this.scene.tweens.add({targets:this.effect,y:0,scaleY:2,ease:"Sine.easeInOut",duration:this.duration,repeat:0});break;case"down":this.effect.setRotation(-Math.PI/2),e=this.scene.tweens.add({targets:this.effect,y:448,scaleY:2,ease:"Sine.easeInOut",duration:this.duration,repeat:0});break;case"left":this.effect.setRotation(Math.PI),e=this.scene.tweens.add({targets:this.effect,x:0,scaleX:2,ease:"Sine.easeInOut",duration:this.duration,repeat:0});break;case"right":this.effect.setRotation(0),e=this.scene.tweens.add({targets:this.effect,x:448,scaleX:2,ease:"Sine.easeInOut",duration:this.duration,repeat:0})}e&&e.on("complete",(()=>{this.effect.destroy()}))}}class c{constructor(e){this.scene=e}playTileAnimation(e,t){e&&(e instanceof n&&"selected"===t?e.play("spin"):e.play(t))}playTileExplodeParticle(e,t=0){if(e&&(this.scene.add.particles(e.x+r.tileWidth/2,e.y+r.tileHeight/2,e.texture.key,{speed:100,lifespan:500,quantity:10,scale:{start:.5,end:0},delay:t,duration:100}),e instanceof n))if("row"===e.special){let t=new o(this.scene,e.x+32,e.y+32,"left"),i=new o(this.scene,e.x+32,e.y+32,"right");t.playEffect(),i.playEffect()}else if("column"===e.special){let t=new o(this.scene,e.x+32,e.y+32,"up"),i=new o(this.scene,e.x+32,e.y+32,"down");t.playEffect(),i.playEffect()}}playSpecialTileParticle(e){if(!e)return;let t;"fullboard"===e.special?t=this.scene.add.particles(0,0,"pink",{speed:{min:-100,max:100},lifespan:300,scale:{start:.25,end:0,ease:"Sine.easeIn"}}).startFollow(e,r.tileWidth/2,r.tileHeight/2):"row"===e.special||"column"===e.special?t=this.scene.add.particles(0,0,"blue",{speed:{min:-100,max:100},lifespan:300,scale:{start:.15,end:0,ease:"Sine.easeIn"},angle:{min:-100,max:-80}}).startFollow(e,r.tileWidth/2,r.tileHeight/2):"rainbow"===e.special&&(t=this.scene.add.particles(0,0,"blue",{speed:{min:-100,max:100},lifespan:300,scale:{start:.15,end:0,ease:"Sine.easeIn"},blendMode:"ADD"}).startFollow(e,r.tileWidth/2,r.tileHeight/2)),e.on("destroy",(()=>{t.stop(!0)}))}playHintParticle(e){e&&this.scene.add.particles(0,0,"Yellow",{speed:1,lifespan:1e3,quantity:10,scale:{start:.2,end:0},duration:1e3,emitZone:{type:"edge",source:e.getBounds(),quantity:32},blendMode:"ADD",frequency:8,stopAfter:32})}}class g{constructor(e){this.scene=e,this.score=0}addScore(e){this.score+=e}get Score(){return this.score}setScore(e){this.score=e}resetScore(){this.score=0}}class u{constructor(e){this.scene=e,this.progress=0,this.progressBar=this.scene.add.nineslice(0,0,"progressBar",0,400).setOrigin(0,0),this.progressFill=this.scene.add.nineslice(10,0,"progressFill",0,390).setOrigin(0,0);let t=this.scene.add.nineslice(0,0,"progressBorder",0,400).setOrigin(0,0);this.progressFill.displayWidth=0,this.milestone=1e4;let i=this.scene.add.zone(0,0,y.width,y.height).setOrigin(0,0);Phaser.Display.Align.In.BottomCenter(this.progressBar,i),Phaser.Display.Align.In.Center(this.progressFill,this.progressBar),Phaser.Display.Align.In.BottomCenter(t,i)}updateProgress(e){1===this.progress&&0===e&&(this.milestone+=1e3),this.progress=e/this.milestone,this.progress>1&&(this.progress=1),this.progressFill.displayWidth!=390*this.progress&&this.scene.tweens.add({targets:this.progressFill,displayWidth:390*this.progress,duration:200,ease:"Sine.easeInOut",yoyo:!1,repeat:0})}get Progress(){return this.progress}}var p;!function(e){e[e.IDLING=0]="IDLING",e[e.SWAPPING=1]="SWAPPING",e[e.REMOVING=2]="REMOVING",e[e.FILLING=3]="FILLING",e[e.RESETING=4]="RESETING",e[e.TRANSITIONING=5]="TRANSITIONING"}(p||(p={}));class f extends Phaser.Scene{constructor(){super({key:"GameScene"})}init(){this.canMove=!1,this.tweenManager=new h(this),this.cameras.main.setBackgroundColor(7908062),this.gameState=p.FILLING,this.grid=[];for(let e=0;e<r.gridHeight;e++){this.grid[e]=[];for(let t=0;t<r.gridWidth;t++){let i=this.add.image(t*r.tileWidth,e*r.tileHeight,"tileback").setDisplaySize(r.tileWidth,r.tileHeight).setDisplayOrigin(0,0).setAlpha(.5);this.grid[e][t]=i}}this.tileGrid=[];for(let e=0;e<r.gridHeight;e++){this.tileGrid[e]=[];for(let t=0;t<r.gridWidth;t++)this.tileGrid[e][t]=this.addTile(t,e)}this.TileGridManager=new a(this,this.tileGrid,this.grid),this.TileAnimationHandler=new c(this),this.tweenManager.startAllTweens(),this.firstSelectedTile=void 0,this.secondSelectedTile=void 0,this.lastInputTime=0,this.ScoreManager=new g(this),this.ProgressManager=new u(this),this.input.on("gameobjectdown",this.tileDown,this),this.events.once("tweensComplete",(()=>{this.canMove=!0,this.gameState=p.IDLING,this.checkMatches()}))}addTile(e,t){let i=r.candyTypes[Phaser.Math.RND.between(0,r.candyTypes.length-1)],s=new l({scene:this,x:e*r.tileWidth,y:-64,texture:i,frame:5});return this.tweenManager.createTween({targets:s,y:t*r.tileHeight,ease:"Quintic.easeInOut",duration:500,repeat:0,yoyo:!1}),s}tileDown(e,t,i){if(this.lastInputTime=this.time.now,this.canMove&&this.gameState==p.IDLING)if(this.firstSelectedTile)if(this.firstSelectedTile===t)this.firstSelectedTile=void 0,this.TileAnimationHandler.playTileAnimation(t,"idle"),this.TileGridManager.unhighlightTileGrid();else{this.secondSelectedTile=t,this.TileAnimationHandler.playTileAnimation(this.secondSelectedTile,"selected"),this.TileGridManager.highlightTileGrid(this.getTilePos(this.tileGrid,this.secondSelectedTile),300);let e=Math.abs(this.firstSelectedTile.x-this.secondSelectedTile.x)/r.tileWidth,i=Math.abs(this.firstSelectedTile.y-this.secondSelectedTile.y)/r.tileHeight;this.TileGridManager.unhighlightTileGrid(),(1===e&&0===i||0===e&&1===i)&&(this.canMove=!1,this.swapTiles()),this.TileAnimationHandler.playTileAnimation(this.firstSelectedTile,"idle"),this.TileAnimationHandler.playTileAnimation(this.secondSelectedTile,"idle"),(e>1||i>1||1===e&&1===i)&&this.tileUp()}else this.firstSelectedTile=t,this.TileAnimationHandler.playTileAnimation(this.firstSelectedTile,"selected"),this.TileGridManager.highlightTileGrid(this.getTilePos(this.tileGrid,this.firstSelectedTile))}swapTiles(){if(this.firstSelectedTile&&this.secondSelectedTile){this.gameState=p.SWAPPING;let e={x:this.firstSelectedTile.x,y:this.firstSelectedTile.y},t={x:this.secondSelectedTile.x,y:this.secondSelectedTile.y};this.tileGrid[e.y/r.tileHeight][e.x/r.tileWidth]=this.secondSelectedTile,this.tileGrid[t.y/r.tileHeight][t.x/r.tileWidth]=this.firstSelectedTile,this.tweenManager.createTween({targets:this.firstSelectedTile,x:this.secondSelectedTile.x,y:this.secondSelectedTile.y,ease:"Quintic.easeInOut",duration:400,repeat:0,yoyo:!1}),this.tweenManager.createTween({targets:this.secondSelectedTile,x:this.firstSelectedTile.x,y:this.firstSelectedTile.y,ease:"Quintic.easeInOut",duration:400,repeat:0,yoyo:!1}),this.tweenManager.startAllTweens(),this.events.once("tweensComplete",(()=>{this.time.delayedCall(200,(()=>{this.gameState=p.IDLING,this.checkMatches()}))})),this.firstSelectedTile=this.tileGrid[e.y/r.tileHeight][e.x/r.tileWidth],this.secondSelectedTile=this.tileGrid[t.y/r.tileHeight][t.x/r.tileWidth]}}checkMatches(){let e=this.getMatches(this.tileGrid);e.length>0?(this.gameState=p.REMOVING,this.removeTileGroup(e)):(this.swapTiles(),this.tileUp(),this.time.delayedCall(200,(()=>{0==e.length&&0==this.tweenManager.allTweens.length&&(this.gameState=p.IDLING,this.lastInputTime=this.time.now),this.canMove=this.gameState==p.IDLING})))}resetTile(){for(let e=this.tileGrid.length-1;e>0;e--)for(let t=this.tileGrid[e].length-1;t>=0;t--)for(let i=1;e-i>=0;i++)if(void 0===this.tileGrid[e][t]&&void 0!==this.tileGrid[e-i][t]){let s=this.tileGrid[e-i][t];this.tileGrid[e][t]=s,this.tileGrid[e-i][t]=void 0,this.tweenManager.createTween({targets:s,y:r.tileHeight*e,ease:"Quintic.easeInOut",duration:500,repeat:0,yoyo:!1}),t=this.tileGrid[e].length}this.tweenManager.startAllTweens(),this.events.once("tweensComplete",(()=>{this.gameState=p.FILLING,this.fillTile()}))}fillTile(){for(var e=0;e<this.tileGrid.length;e++)for(var t=0;t<this.tileGrid[e].length;t++)if(void 0===this.tileGrid[e][t]){let i=this.addTile(t,e);this.tileGrid[e][t]=i}this.tweenManager.startAllTweens(),this.events.once("tweensComplete",(()=>{this.tileUp(),this.time.delayedCall(200,(()=>{this.checkMatches()}))}))}tileUp(){this.firstSelectedTile=void 0,this.secondSelectedTile=void 0}removeTileGroup(e){for(var t=0;t<e.length;t++){var i=e[t];if(i.length<=3)for(var s=0;s<i.length;s++){let r=i[s];r instanceof n&&this.specialTileHandler(r,e);let l=this.getTilePos(this.tileGrid,r);-1!==l.x&&-1!==l.y&&this.tweenManager.createTween({targets:r,alpha:.5,duration:50,repeat:0,delay:50*t}).on("complete",(()=>{this.TileAnimationHandler.playTileExplodeParticle(r),r.destroy(),this.tileGrid[l.y][l.x]=void 0,this.ScoreManager.addScore(10+5*t)}))}else if(4==i.length){let e="row";e=0==Phaser.Math.RND.between(0,1)?"row":"column";let r=i.indexOf(this.firstSelectedTile);-1==r&&(r=i.indexOf(this.secondSelectedTile)),-1==r&&(r=0);let l=new n({scene:this,x:i[r].x,y:i[r].y,texture:i[r].texture.key,frame:5},e),a=this.getTilePos(this.tileGrid,i[r]);for(this.tileGrid[a.y][a.x]instanceof n&&(l.special="fullboard"),this.tileGrid[a.y][a.x].destroy(),this.tileGrid[a.y][a.x]=void 0,s=0;s<i.length;s++){if(s==r)continue;let e=this.getTilePos(this.tileGrid,i[s]),a=i[s];a instanceof n&&(l.special="fullboard"),this.tweenManager.createTween({targets:a,x:l.x,y:l.y,duration:250,repeat:0,yoyo:!1}).on("complete",(()=>{this.tileGrid[e.y][e.x]&&(a.destroy(),this.tileGrid[e.y][e.x]=void 0,this.ScoreManager.addScore(20+5*t))}))}this.tileGrid[a.y][a.x]=l,this.TileAnimationHandler.playSpecialTileParticle(l)}else if(i.length>=5){let e=i.indexOf(this.firstSelectedTile);-1==e&&(e=i.indexOf(this.secondSelectedTile)),-1==e&&(e=0);let r=new n({scene:this,x:i[e].x,y:i[e].y,texture:i[e].texture.key,frame:5},"rainbow"),l=this.getTilePos(this.tileGrid,i[e]);for(this.tileGrid[l.y][l.x]instanceof n&&(r.special="fullboard"),this.tileGrid[l.y][l.x].destroy(),this.tileGrid[l.y][l.x]=void 0,s=0;s<i.length;s++){if(s==e)continue;let l=this.getTilePos(this.tileGrid,i[s]),a=i[s];a instanceof n&&(r.special="fullboard"),this.tweenManager.createTween({targets:a,x:r.x,y:r.y,duration:250,repeat:0,yoyo:!1}).on("complete",(()=>{this.tileGrid[l.y][l.x]&&(a.destroy(),this.tileGrid[l.y][l.x]=void 0,this.ScoreManager.addScore(30+5*t))}))}this.tileGrid[l.y][l.x]=r,this.TileAnimationHandler.playSpecialTileParticle(r)}}this.tweenManager.startAllTweens(),this.events.once("tweensComplete",(()=>{this.time.delayedCall(200,(()=>{this.gameState=p.RESETING,this.ProgressManager.updateProgress(this.ScoreManager.Score),this.resetTile()}))}))}getTilePos(e,t){let i={x:-1,y:-1};for(let s=0;s<e.length;s++)for(let r=0;r<e[s].length;r++)if(t===e[s][r]){i.x=r,i.y=s;break}return i}getMatches(e){let t=[],i=[],s=[];if(this.firstSelectedTile&&this.secondSelectedTile&&this.secondSelectedTile instanceof n&&"fullboard"==this.secondSelectedTile.special)return t.push([this.secondSelectedTile]),t;for(let r=0;r<e.length;r++)for(let l=0;l<e[r].length;l++){let n=e[r][l],a=[],h=[],d=0,o=0;if(-1==i.indexOf(n)){let c=!1;if(t.forEach((e=>{-1!==e.indexOf(n)&&(i=e,c=!0)})),c){if(2==s[t.indexOf(i)]){i=[];continue}}else i.push(n);d=i.indexOf(n),o=t.indexOf(i);for(let n=l+1;n<e[r].length&&e[r][l].texture.key===e[r][n].texture.key;n++){let l=!1;if(t.forEach((t=>{-1!==t.indexOf(e[r][n])&&(l=!0)})),l)break;a.push(e[r][n]),c&&a.length>=2&&(s[t.indexOf(i)]=2)}for(let n=l-1;n>=0&&e[r][l].texture.key===e[r][n].texture.key;n--){let l=!1;if(t.forEach((t=>{-1!==t.indexOf(e[r][n])&&(l=!0)})),l)break;a.push(e[r][n]),c&&a.length>=2&&(s[t.indexOf(i)]=2)}for(let n=r+1;n<e.length&&e[r][l].texture.key===e[n][l].texture.key;n++){let r=!1;if(t.forEach((t=>{-1!==t.indexOf(e[n][l])&&(r=!0)})),r)break;h.push(e[n][l]),c&&h.length>=2&&(s[t.indexOf(i)]=2)}for(let n=r-1;n>=0&&e[r][l].texture.key===e[n][l].texture.key;n--){let r=!1;if(t.forEach((t=>{-1!==t.indexOf(e[n][l])&&(r=!0)})),r)break;h.push(e[n][l]),c&&h.length>=2&&(s[t.indexOf(i)]=2)}}-1==t.indexOf(i)&&(a.length>=2||h.length>=2)?(h.length>=2&&(i=i.concat(h)),a.length>=2&&(i=i.concat(a)),t.push(i),a.length>=2&&h.length>=2?s.push(2):s.push(1)):(a.length>=2||h.length>=2)&&(h.length>=2&&(t[t.indexOf(i)]=t[t.indexOf(i)].concat(h)),a.length>=2&&(t[t.indexOf(i)]=t[t.indexOf(i)].concat(a)),[t[o][0],t[o][d]]=[t[o][d],t[o][0]]),i=[]}return t}specialTileHandler(e,t){let i=this.getTilePos(this.tileGrid,e);if(-1!=i.x&&-1!=i.y)if("row"==e.special)for(let s=1;s<this.tileGrid[i.y].length;s++){if(i.x-s>=0){let r=this.tileGrid[i.y][i.x-s];if(r&&r!==e){let e=!1;t.forEach((t=>{-1!==t.indexOf(r)&&(e=!0)})),e||t.push([r])}}if(i.x+s<this.tileGrid[i.y].length){let r=this.tileGrid[i.y][i.x+s];if(r&&r!==e){let e=!1;t.forEach((t=>{-1!==t.indexOf(r)&&(e=!0)})),e||t.push([r])}}}else if("column"==e.special)for(let s=1;s<this.tileGrid.length;s++){if(i.y-s>=0){let r=this.tileGrid[i.y-s][i.x];if(r&&r!==e){let e=!1;t.forEach((t=>{-1!==t.indexOf(r)&&(e=!0)})),e||t.push([r])}}if(i.y+s<this.tileGrid.length){let r=this.tileGrid[i.y+s][i.x];if(r&&r!==e){let e=!1;t.forEach((t=>{-1!==t.indexOf(r)&&(e=!0)})),e||t.push([r])}}}else if("rainbow"==e.special)for(let i=0;i<this.tileGrid.length;i++)for(let s=0;s<this.tileGrid[i].length;s++){let r=this.tileGrid[i][s];if(r&&r!==e&&r.texture.key===e.texture.key){let e=!1;t.forEach((t=>{-1!==t.indexOf(r)&&(e=!0)})),e||t.push([r])}}else if("fullboard"==e.special)for(let i=0;i<this.tileGrid.length;i++)for(let s=0;s<this.tileGrid[i].length;s++){let r=this.tileGrid[i][s];if(r&&r!==e){let e=!1;t.forEach((t=>{-1!==t.indexOf(r)&&(e=!0)})),e||t.push([r])}}}getHint(e){let t=[];for(let i=0;i<e.length;i++){let s=e[i];for(let r=0;r<s.length;r++){if(r<s.length-3&&e[i][r]&&e[i][r+2]&&e[i][r+3]&&e[i][r].texture.key===e[i][r+2].texture.key&&e[i][r+2].texture.key===e[i][r+3].texture.key)return t.push([e[i][r],e[i][r+1]]),t;if(r>2&&e[i][r]&&e[i][r-2]&&e[i][r-3]&&e[i][r].texture.key===e[i][r-2].texture.key&&e[i][r-2].texture.key===e[i][r-3].texture.key)return t.push([e[i][r],e[i][r-1]]),t;if(r<s.length-1&&(i<e.length-2||i>1)){if(e[i][r]&&i<e.length-2&&e[i+1][r+1]&&e[i+2][r+1]&&e[i][r].texture.key===e[i+1][r+1].texture.key&&e[i+1][r+1].texture.key===e[i+2][r+1].texture.key)return t.push([e[i][r],e[i][r+1]]),t;if(e[i][r]&&i>1&&e[i-1][r+1]&&e[i-2][r+1]&&e[i][r].texture.key===e[i-1][r+1].texture.key&&e[i-1][r+1].texture.key===e[i-2][r+1].texture.key)return t.push([e[i][r],e[i][r+1]]),t;if(e[i][r]&&i>0&&i<e.length-1&&e[i-1][r+1]&&e[i+1][r+1]&&e[i][r].texture.key===e[i-1][r+1].texture.key&&e[i-1][r+1].texture.key===e[i+1][r+1].texture.key)return t.push([e[i][r],e[i][r+1]]),t}if(r>1&&(i<e.length-2||i>1)){if(e[i][r]&&i<e.length-2&&e[i+1][r-1]&&e[i+2][r-1]&&e[i][r].texture.key===e[i+1][r-1].texture.key&&e[i+1][r-1].texture.key===e[i+2][r-1].texture.key)return t.push([e[i][r],e[i][r-1]]),t;if(e[i][r]&&i>1&&e[i-1][r-1]&&e[i-2][r-1]&&e[i][r].texture.key===e[i-1][r-1].texture.key&&e[i-1][r-1].texture.key===e[i-2][r-1].texture.key)return t.push([e[i][r],e[i][r-1]]),t;if(e[i][r]&&i>0&&i<e.length-1&&e[i-1][r-1]&&e[i+1][r-1]&&e[i][r].texture.key===e[i-1][r-1].texture.key&&e[i-1][r-1].texture.key===e[i+1][r-1].texture.key)return t.push([e[i][r],e[i][r-1]]),t}}}for(let s=0;s<e.length;s++){var i=e[s];for(let r=0;r<i.length;r++){if(r<i.length-3&&e[r][s]&&e[r+2][s]&&e[r+3][s]&&e[r][s].texture.key===e[r+2][s].texture.key&&e[r+2][s].texture.key===e[r+3][s].texture.key)return t.push([e[r][s],e[r+1][s]]),t;if(r>2&&e[r][s]&&e[r-2][s]&&e[r-3][s]&&e[r][s].texture.key===e[r-2][s].texture.key&&e[r-2][s].texture.key===e[r-3][s].texture.key)return t.push([e[r][s],e[r-1][s]]),t;if(r<i.length-1&&(s<e.length-2||s>1)){if(e[r][s]&&s<e.length-2&&e[r+1][s+1]&&e[r+1][s+2]&&e[r][s].texture.key===e[r+1][s+1].texture.key&&e[r+1][s+1].texture.key===e[r+1][s+2].texture.key)return t.push([e[r][s],e[r+1][s]]),t;if(e[r][s]&&s>1&&e[r+1][s-1]&&e[r+1][s-2]&&e[r][s].texture.key===e[r+1][s-1].texture.key&&e[r+1][s-1].texture.key===e[r+1][s-2].texture.key)return t.push([e[r][s],e[r+1][s]]),t;if(e[r][s]&&s>0&&s<e.length-1&&e[r+1][s-1]&&e[r+1][s+1]&&e[r][s].texture.key===e[r+1][s-1].texture.key&&e[r+1][s-1].texture.key===e[r+1][s+1].texture.key)return t.push([e[r][s],e[r+1][s]]),t}if(r>1&&(s<e.length-2||s>1)){if(e[r][s]&&s<e.length-2&&e[r-1][s+1]&&e[r-1][s+2]&&e[r][s].texture.key===e[r-1][s+1].texture.key&&e[r-1][s+1].texture.key===e[r-1][s+2].texture.key)return t.push([e[r][s],e[r-1][s]]),t;if(e[r][s]&&s>1&&e[r-1][s-1]&&e[r-1][s-2]&&e[r][s].texture.key===e[r-1][s-1].texture.key&&e[r-1][s-1].texture.key===e[r-1][s-2].texture.key)return t.push([e[r][s],e[r-1][s]]),t;if(e[r][s]&&s>0&&s<e.length-1&&e[r-1][s-1]&&e[r-1][s+1]&&e[r][s].texture.key===e[r-1][s-1].texture.key&&e[r-1][s-1].texture.key===e[r-1][s+1].texture.key)return t.push([e[r][s],e[r-1][s]]),t}}}return t}changeLevel(){this.TileGridManager.transitionTileGrid(),this.events.once("tweensComplete",(()=>{this.gameState=p.IDLING,this.ScoreManager.resetScore(),this.ProgressManager.updateProgress(this.ScoreManager.Score),this.lastInputTime=this.time.now}))}update(e,t){if(this.gameState==p.IDLING&&this.canMove&&this.ProgressManager.Progress>=1&&(this.gameState=p.TRANSITIONING,this.lastInputTime=this.time.now,this.changeLevel()),this.gameState==p.IDLING&&e-this.lastInputTime>5e3){this.lastInputTime=this.time.now;let e=this.getHint(this.tileGrid);e.length>0&&(this.TileAnimationHandler.playHintParticle(e[0][0]),this.TileAnimationHandler.playHintParticle(e[0][1]),this.time.delayedCall(1e3,(()=>{this.firstSelectedTile||this.secondSelectedTile||(this.gameState=p.TRANSITIONING,this.TileGridManager.idleTileGrid())}))),this.events.once("tileGridIdleComplete",(()=>{this.gameState=p.IDLING,this.lastInputTime=this.time.now}))}}}const y={title:"Candy crush",version:"0.0.1",width:512,height:640,type:Phaser.AUTO,parent:"game",scene:[s,f],backgroundColor:"#de3412",render:{pixelArt:!0},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH}};class x extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new x(y)}))}},i={};function s(e){var r=i[e];if(void 0!==r)return r.exports;var l=i[e]={exports:{}};return t[e].call(l.exports,l,l.exports,s),l.exports}s.m=t,e=[],s.O=(t,i,r,l)=>{if(!i){var n=1/0;for(o=0;o<e.length;o++){for(var[i,r,l]=e[o],a=!0,h=0;h<i.length;h++)(!1&l||n>=l)&&Object.keys(s.O).every((e=>s.O[e](i[h])))?i.splice(h--,1):(a=!1,l<n&&(n=l));if(a){e.splice(o--,1);var d=r();void 0!==d&&(t=d)}}return t}l=l||0;for(var o=e.length;o>0&&e[o-1][2]>l;o--)e[o]=e[o-1];e[o]=[i,r,l]},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var r,l,[n,a,h]=i,d=0;if(n.some((t=>0!==e[t]))){for(r in a)s.o(a,r)&&(s.m[r]=a[r]);if(h)var o=h(s)}for(t&&t(i);d<n.length;d++)l=n[d],s.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return s.O(o)},i=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var r=s.O(void 0,[96],(()=>s(769)));r=s.O(r)})();