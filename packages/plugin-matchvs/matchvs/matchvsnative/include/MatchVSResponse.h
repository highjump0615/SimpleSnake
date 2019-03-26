#ifndef __MATCH_VS_RESPONSE_H__
#define __MATCH_VS_RESPONSE_H__

#include "MatchVSDefines.h"

namespace matchvs
{
	/** @brief 应答通知接口类(基类)  */
	class DLL_API MatchVSResponse
	{
	public:
		MatchVSResponse() {};
		virtual ~MatchVSResponse() {};

	public:
		/**
		* @brief 调用MatchVSEngine的registerUser注册账号信息的回调
		* @param userInfo 创建成功的用户信息
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int registerUserResponse(const MsUserInfo &userInfo) = 0;

		/**
		* @brief 登录 回调
		* @param tRsp 登录结果
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int loginResponse(const MsLoginRsp &tRsp) = 0;
		virtual int reconnectResponse(const MsRoomJoinRsp &rsp) = 0;

		/**
		* @brief 登出 回调
		* @param tRsp 登出结果
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int logoutResponse(const MsLogoutRsp &tRsp) = 0;

		virtual void createRoomResponse(const MsCreateRoomRsp &rsp) = 0;

		virtual void getRoomListResponse(const MsRoomListRsp &rsp) = 0;
		virtual void getRoomListExResponse(const MsGetRoomListExRsp &rsp) = 0;

		/**
		* @brief 获取房间详情回调
		* @param rsp 房间详情
		*/
		virtual void getRoomDetailResponse(const MsGetRoomDetailRsp &rsp) = 0;

		virtual int setRoomPropertiesResponse(const MsSetRoomPropertiesRsp &rsp) = 0;
		virtual int setRoomPropertiesNotify(const MsSetRoomPropertiesNotify &notify) = 0;

		/**
		* @brief 进入房间回调
		* @param tRsp 进入 结果
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int roomJoinResponse(const MsRoomJoinRsp *tRsp) = 0;

		/**
		* @brief 加入房间通知回调
		* @param tRsp 加入房间通知内容
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int roomPeerJoinNotify(const MsRoomUserInfo &objPeerJoin) = 0;

		/**
		* @brief 房间停止加人 回调
		* @param tRsp 进入 结果
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int roomJoinOverResponse(const MsRoomJoinOverRsp *tRsp) = 0;
		virtual void joinOverNotify(const MsJoinOverNotifyInfo &notifyInfo) = 0;

		virtual int joinOpenRsp(const MsJoinOpenRsp &data) = 0;
		virtual int joinOpenNotify(const MsJoinOpenNotify &data) = 0;

		/**
		* @brief 退出房间返回， 回调
		* @param tRsp 退出 结果
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int roomLeaveResponse(const MsRoomLeaveRsp &tRsp) = 0;

		/**
		* @brief 其他玩家离开房间通知
		* @param notifyInfo 离开房间通知内容
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int roomPeerLeaveNotify(const MsLeaveRoomNotifyInfo &notifyInfo) = 0;

		virtual void kickPlayerRsp(const MsKickPlayerRsp &rsp) = 0;
		virtual void kickPlayerNotify(const MsKickPlayerNotify &notify) = 0;

		/**
		* @brief 发送消息， 回调
		* @param tRsp 退出 结果
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int sendEventRsp(const MsSendEventRsp &tRsp) = 0;

		/**
		* @brief 发送消息通知， 回调
		* @param tRsp 退出 结果
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual void sendEventNotify(const MsSendEventNotify &tRsp) = 0;
		virtual void gameServerNotify(const MsGameServerNotifyInfo &info) = 0;

		/**
		* @brief 异常消息回调
		* @param sError  异常消息
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int errorResponse(const char *sError) = 0;
		virtual int errorResponseEx(int code, const char *text) = 0;

		/**
		* @brief 网络延迟时间，每5秒更新一次
		* @param delay 延迟时间，单位：毫秒
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		virtual int networkDelay(const int delay) = 0;

		virtual int networkStateNotify(const MsNetworkStateNotify &notify) = 0;

		virtual void subscribeEventGroupResponse(const MsSubscribeEventGroupRsp &tRsp) = 0;
		virtual void sendEventGroupResponse(const MsSendEventGroupRsp &tRsp) = 0;
		virtual void sendEventGroupNotify(const MsSendEventGroupNotify &notify) = 0;

		virtual void setFrameSyncResponse(const MsSetChannelFrameSyncRsp &rsp) = 0;
		virtual void sendFrameEventResponse(const MsSendFrameEventRsp &rsp) = 0;
		virtual void frameUpdate(const MsFrameData &data) = 0;
	};
}

#endif
