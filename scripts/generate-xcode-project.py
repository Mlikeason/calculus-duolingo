"""Generate a deterministic Xcode project without a global XcodeGen dependency."""
import hashlib, json, pathlib, plistlib
root = pathlib.Path(__file__).resolve().parents[1] / 'ios'
objects = {}
def uid(s): return hashlib.sha1(s.encode()).hexdigest()[:24].upper()
def add(key, isa, **kwargs):
 i=uid(key);objects[i]={'isa':isa,**kwargs};return i
refs=[];sources=[];resources=[]
for path in sorted((root/'Weiji').rglob('*.swift')):
 rel=str(path.relative_to(root));ref=add(rel,'PBXFileReference',lastKnownFileType='sourcecode.swift',path=rel,sourceTree='<group>');refs.append(ref)
 sources.append(add(rel+'build','PBXBuildFile',fileRef=ref))
for path,kind in [('Weiji/Content','folder'),('Weiji/Assets.xcassets','folder.assetcatalog'),('Weiji/PrivacyInfo.xcprivacy','text.xml')]:
 ref=add(path,'PBXFileReference',lastKnownFileType=kind,path=path,sourceTree='<group>');refs.append(ref);resources.append(add(path+'build','PBXBuildFile',fileRef=ref))
products=[];targets=[]
def config_list(key, settings):
 configs=[]
 for name in ['Debug','Release']:
  s=dict(settings)
  s.update({'SWIFT_OPTIMIZATION_LEVEL':'-Onone' if name=='Debug' else '-O','DEBUG_INFORMATION_FORMAT':'dwarf' if name=='Debug' else 'dwarf-with-dsym'})
  if name=='Debug': s['SWIFT_ACTIVE_COMPILATION_CONDITIONS']='DEBUG $(inherited)'
  configs.append(add(key+name,'XCBuildConfiguration',buildSettings=s,name=name))
 return add(key+'configs','XCConfigurationList',buildConfigurations=configs,defaultConfigurationIsVisible='0',defaultConfigurationName='Release')
common={'SDKROOT':'iphoneos','IPHONEOS_DEPLOYMENT_TARGET':'17.0','SWIFT_VERSION':'5.0','TARGETED_DEVICE_FAMILY':'1,2','CODE_SIGN_STYLE':'Automatic','ENABLE_USER_SCRIPT_SANDBOXING':'YES','CLANG_ENABLE_MODULES':'YES','SWIFT_STRICT_CONCURRENCY':'complete','GENERATE_INFOPLIST_FILE':'NO'}
appsettings={**common,'PRODUCT_BUNDLE_IDENTIFIER':'me.zhuhong.weiji','PRODUCT_NAME':'Weiji','INFOPLIST_FILE':'Weiji/Info.plist','ASSETCATALOG_COMPILER_APPICON_NAME':'AppIcon','MARKETING_VERSION':'1.0.0','CURRENT_PROJECT_VERSION':'5','LD_RUNPATH_SEARCH_PATHS':['$(inherited)','@executable_path/Frameworks'],'SUPPORTS_MACCATALYST':'NO','SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD':'YES','SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD':'YES','ENABLE_TESTABILITY':'YES'}
product=add('app-product','PBXFileReference',explicitFileType='wrapper.application',path='Weiji.app',sourceTree='BUILT_PRODUCTS_DIR');products.append(product)
app=add('app','PBXNativeTarget',name='Weiji',productName='Weiji',productReference=product,productType='com.apple.product-type.application',buildConfigurationList=config_list('app',appsettings),buildPhases=[add('app-sources','PBXSourcesBuildPhase',buildActionMask='2147483647',files=sources,runOnlyForDeploymentPostprocessing='0'),add('app-frameworks','PBXFrameworksBuildPhase',buildActionMask='2147483647',files=[],runOnlyForDeploymentPostprocessing='0'),add('app-resources','PBXResourcesBuildPhase',buildActionMask='2147483647',files=resources,runOnlyForDeploymentPostprocessing='0')],buildRules=[],dependencies=[]);targets.append(app)
for name,typ in [('WeijiTests','unit-test'),('WeijiUITests','ui-testing')]:
 files=[]
 for path in sorted((root/name).glob('*.swift')):
  rel=str(path.relative_to(root));r=add(rel,'PBXFileReference',lastKnownFileType='sourcecode.swift',path=rel,sourceTree='<group>');refs.append(r);files.append(add(rel+'build','PBXBuildFile',fileRef=r))
 prod=add(name+'product','PBXFileReference',explicitFileType='wrapper.cfbundle',path=name+'.xctest',sourceTree='BUILT_PRODUCTS_DIR');products.append(prod)
 settings={**common,'PRODUCT_NAME':name,'PRODUCT_BUNDLE_IDENTIFIER':'me.zhuhong.weiji.'+name,'GENERATE_INFOPLIST_FILE':'YES','LD_RUNPATH_SEARCH_PATHS':['$(inherited)','@executable_path/Frameworks','@loader_path/Frameworks']}
 if typ=='unit-test':settings.update({'TEST_HOST':'$(BUILT_PRODUCTS_DIR)/Weiji.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/Weiji','BUNDLE_LOADER':'$(TEST_HOST)'})
 else:settings['TEST_TARGET_NAME']='Weiji'
 proxy=add(name+'proxy','PBXContainerItemProxy',containerPortal=uid('project'),proxyType='1',remoteGlobalIDString=app,remoteInfo='Weiji')
 dependency=add(name+'dependency','PBXTargetDependency',target=app,targetProxy=proxy)
 target=add(name,'PBXNativeTarget',name=name,productName=name,productReference=prod,productType='com.apple.product-type.bundle.'+typ,buildConfigurationList=config_list(name,settings),buildPhases=[add(name+'sources','PBXSourcesBuildPhase',buildActionMask='2147483647',files=files,runOnlyForDeploymentPostprocessing='0'),add(name+'frameworks','PBXFrameworksBuildPhase',buildActionMask='2147483647',files=[],runOnlyForDeploymentPostprocessing='0')],buildRules=[],dependencies=[dependency]);targets.append(target)
productsGroup=add('products','PBXGroup',children=products,name='Products',sourceTree='<group>')
main=add('main','PBXGroup',children=refs+[productsGroup],sourceTree='<group>')
project=add('project','PBXProject',attributes={'BuildIndependentTargetsInParallel':'YES','LastUpgradeCheck':'2720','TargetAttributes':{app:{'CreatedOnToolsVersion':'27.2'}}},buildConfigurationList=config_list('project',{'CLANG_ENABLE_OBJC_ARC':'YES','GCC_C_LANGUAGE_STANDARD':'gnu17'}),compatibilityVersion='Xcode 14.0',developmentRegion='zh-Hans',hasScannedForEncodings='0',knownRegions=['zh-Hans','Base'],mainGroup=main,productRefGroup=productsGroup,projectDirPath='',projectRoot='',targets=targets)
def fmt(v,depth=0):
 if isinstance(v,dict):return '{\n'+''.join('\t'*(depth+1)+json.dumps(k)+ ' = '+fmt(value,depth+1)+';\n' for k,value in v.items())+'\t'*depth+'}'
 if isinstance(v,list):return '( '+', '.join(fmt(x,depth) for x in v)+' )'
 return json.dumps(str(v),ensure_ascii=False)
folder=root/'Weiji.xcodeproj';folder.mkdir(exist_ok=True)
(folder/'project.pbxproj').write_text('// !$*UTF8*$!\n'+fmt({'archiveVersion':'1','classes':{},'objectVersion':'56','objects':objects,'rootObject':project})+'\n')
scheme=folder/'xcshareddata/xcschemes';scheme.mkdir(parents=True,exist_ok=True)
def reference(i,name):return f'<BuildableReference BuildableIdentifier="primary" BlueprintIdentifier="{i}" BuildableName="{name}" BlueprintName="{name.split(".")[0]}" ReferencedContainer="container:Weiji.xcodeproj"/>'
(scheme/'Weiji.xcscheme').write_text(f'''<?xml version="1.0" encoding="UTF-8"?>
<Scheme LastUpgradeVersion="2720" version="1.3"><BuildAction parallelizeBuildables="YES" buildImplicitDependencies="YES"><BuildActionEntries><BuildActionEntry buildForTesting="YES" buildForRunning="YES" buildForProfiling="YES" buildForArchiving="YES" buildForAnalyzing="YES">{reference(app,'Weiji.app')}</BuildActionEntry></BuildActionEntries></BuildAction><TestAction buildConfiguration="Debug" selectedDebuggerIdentifier="Xcode.DebuggerFoundation.Debugger.LLDB" selectedLauncherIdentifier="Xcode.IDEFoundation.Launcher.LLDB" shouldUseLaunchSchemeArgsEnv="YES"><Testables><TestableReference skipped="NO">{reference(uid('WeijiTests'),'WeijiTests.xctest')}</TestableReference><TestableReference skipped="NO">{reference(uid('WeijiUITests'),'WeijiUITests.xctest')}</TestableReference></Testables></TestAction><LaunchAction buildConfiguration="Debug" selectedDebuggerIdentifier="Xcode.DebuggerFoundation.Debugger.LLDB" selectedLauncherIdentifier="Xcode.IDEFoundation.Launcher.LLDB" launchStyle="0" useCustomWorkingDirectory="NO" ignoresPersistentStateOnLaunch="NO" debugDocumentVersioning="YES" debugServiceExtension="internal" allowLocationSimulation="YES"><BuildableProductRunnable runnableDebuggingMode="0">{reference(app,'Weiji.app')}</BuildableProductRunnable></LaunchAction><ProfileAction buildConfiguration="Release" shouldUseLaunchSchemeArgsEnv="YES" savedToolIdentifier="" useCustomWorkingDirectory="NO" debugDocumentVersioning="YES"><BuildableProductRunnable runnableDebuggingMode="0">{reference(app,'Weiji.app')}</BuildableProductRunnable></ProfileAction><AnalyzeAction buildConfiguration="Debug"/><ArchiveAction buildConfiguration="Release" revealArchiveInOrganizer="YES"/></Scheme>''')
print(folder)
