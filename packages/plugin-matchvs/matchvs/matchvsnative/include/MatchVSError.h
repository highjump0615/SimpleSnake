#ifndef __MATCH_VS_ERROR_H__
#define __MATCH_VS_ERROR_H__


/** @brief 错误返回状态码： 成功 */
#define MATCHVS_RESPONSE_SUCCESS					1

/** @brief 错误返回状态码： 失败 */
#define MATCHVS_RESPONSE_FAIL						2

/** @brief 错误返回值：成功 */
#define MATCHVS_OK									0

/** @brief 错误返回值：通用错误 */
#define MATCHVS_ERROR								-1

/** @brief 错误返回值：系统错误 */
#define MATCHVS_SYSTEM_ERROR						-2



/* 调用接口错误码： 接口直接错误返回值 */
/** @brief 错误码： 初始化未完成  */
#define	MS_ERROR_NOT_INIT_DONE						1996

/** @brief 错误码： 网络错误 */
#define	MS_ERROR_NETWORK							1997

/** @brief 错误码： 用户登录中 */
#define	MS_ERROR_USER_LOGIN_ING						1998

/** @brief 错误码： 用户已经登录 */
#define	MS_ERROR_USER_ALRADY_LOGIN					1999

/** @brief 错误码： 用户未登录 */
#define	MS_ERROR_USER_NOT_LOGIN						2000

/** @brief 错误码： 用户登录失败 */
#define	MS_ERROR_USER_LOGIN_FAILED					2001

/** @brief 错误码： 用户未进入房间 */
#define			MS_ERROR_USER_NOT_JOIN_ROOM			2002

/** @brief 错误码： 用户进入房间失败 */
#define	MS_ERROR_USER_JOIN_ROOM_FAILED				2003

/** @brief 错误码： 用户未准备 */
#define	MS_ERROR_USER_NOT_READY						2004

/** @brief 错误码： 用户准备失败 */
#define	MS_ERROR_USER_READY_FAILED					2005

/** @brief 错误码： 用户未开始 */
#define	MS_ERROR_USER_NOT_START						2006

/** @brief 错误码： 用户开始失败 */
#define	MS_ERROR_USER_START_FAILED					2007

/** @brief 错误码： 用户未取消准备 */
#define	MS_ERROR_USER_NOT_CANCEL_READY				2008

/** @brief 错误码： 用户取消准备失败 */
#define	MS_ERROR_USER_CANCEL_READY_FAILED			2009

/** @brief 错误码： 用户未结束游戏（分数上报） */
#define	MS_ERROR_USER_NOT_GAMEOVER					2010

/** @brief 错误码： 用户结束游戏（分数上报）失败 */
#define	MS_ERROR_USER_GAMEOVER_FAILED				2011

/** @brief 错误码： 用户未退出游戏 */
#define	MS_ERROR_USER_NOT_LOGOUT					2012

/** @brief 错误码： 用户退出游戏失败 */
#define	MS_ERROR_USER_LOGOUT_FAILED					2013

/** @brief 错误码： 用户已经在房间中 */
#define	MS_ERROR_USER_ALREADY_IN_ROOM				2014

/** @brief 错误码： 没有相应的gateway id */
#define	MS_ERROR_NO_GATEWAY_ID						2015

/** @brief http response code is not 200 */
#define MS_ERROR_HTTP_RESPONSE_NOT_OK				2016

#define MS_ERROR_SERVER_CLOSE_CONN					2017

#define MS_ERROR_CONN_ERROR							2018

#endif
