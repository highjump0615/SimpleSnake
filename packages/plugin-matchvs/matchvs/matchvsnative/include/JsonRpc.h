#ifndef _Included_JSONRPC_H_
#define _Included_JSONRPC_H_

#include "utils.h"
#if (defined(_WIN32) || defined(WIN32) || defined(__WIN32__) || defined(_WIN64) || defined(__WINDOWS__))
#define PInvokeCall __stdcall
#else 
#define PInvokeCall
#endif

#ifdef __cplusplus
extern "C" {
#endif

	extern int JsonRpc_isPushQueue;

	EXPORT void JsonRpc_onLoad();

	typedef struct JsonRpc_JsonHandler {
		int (PInvokeCall *handleJsonString)(const char* jsonMessage, int jsonMessageLen);
		int (PInvokeCall *handleByte)(int action, char* data, int dataLen);
		int (PInvokeCall *handleUpdate)();
	}MessageHandler;

	EXPORT int JsonRpc_regitCallBack(JsonRpc_JsonHandler* handler);

	typedef struct JsonRpc_CCallCsharp {
		int(PInvokeCall *callJsonString)(const char* jsonMessage, int jsonMessageLen);
		int(PInvokeCall *callByte)(int action, const char* data, int dataLen);
	}JsonRpc_CCallCsharp;

	EXPORT int PInvokeCall JsonRpc_regitCCallCsharp(JsonRpc_CCallCsharp* phandler);

	EXPORT int PInvokeCall JsonRpc_callJsonMethodByte(int action, const char* data, int dataLen);
	EXPORT int PInvokeCall JsonRpc_callJsonMethod(const char* jsonMessage, int jsonMessageLen);

	EXPORT int PInvokeCall JsonRpc_callNativeMethodByte(int action, char *data, int dataLen);
	EXPORT int PInvokeCall JsonRpc_callNativeMethod(char* jsonMsg, int jsonMsgLen);

	EXPORT int PInvokeCall JsonRpc_update();

#ifdef __cplusplus
}
#endif
#endif
