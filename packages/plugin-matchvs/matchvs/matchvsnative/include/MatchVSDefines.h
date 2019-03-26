#ifndef __MATCH_VS_STRUCT_H__
#define __MATCH_VS_STRUCT_H__

#include <vector>
#include <list>
#include <map>

#include <stdint.h>

#include "MsString.h"

#if (defined(WIN32) || defined(_WIN32) || defined(__WIN32__) || defined(__NT__))
	#define DLL_API __declspec(dllexport)
#else
	#define DLL_API __attribute__((visibility("default")))
#endif

namespace matchvs
{
	enum RoomState
	{
		ROOM_STATE_NIL,
		ROOM_STATE_OPENED,
		ROOM_STATE_CLOSED,
	};

	enum RoomListSort
	{
		ROOM_SORT_NIL,				// 
		ROOM_SORT_CREATE_TIME,
		ROOM_SORT_PLAYER_NUM,
		ROOM_SORT_STATE,
	};

	enum SortOrder
	{
		SORT_ASC,
		SORT_DESC,
	};

	typedef enum MsEventType {
		/** @brief MVS转发给CPS，CPS处理后广播给客户端 */
		MS_EVENT_TYPE_TO_CPS 		= 0,

		/** @brief MVS直接广播给房间内成员并转发给CPS */
		MS_EVENT_TYPE_TO_MVS_CPS 	= 1,

		/** @brief MVS直接广播给房间内成员 */
		MS_EVENT_TYPE_TO_MVS 		= 2,
	}MsEventType;

	typedef struct MsGateway {
		int					id;
		MsString			name;
		MsString			isp;
		MsString			area;
		MsString			ip;
		MsString			ipSpeed;
		int					iSpeedTime;
		int					iAvgLatency;
		int 				iMinLatency;
		int 				iMaxLatency;
		float				fSuccRate;
		
		MsGateway() : id(0) {}
	} MsGateway;

	typedef struct MsGatewayRsp {
		int 				status;
		int					iBestGatewayID;
		int					gatewaySize;
		MsGateway			gatewayList[0];
		MsGatewayRsp() : status(0), iBestGatewayID(0), gatewaySize(0) {}
	} MsGatewayRsp;

	/**
	* @brief  用户信息类
	*/
	typedef struct MsUserInfo
	{
		int32_t				status;					// 是否成功，0：成功；1：失败
		int					userID;					// 用户ID
		MsString			token;					// 用户Token
		MsString			name;					// 用户昵称
		MsString			avatar;					// 用户头像地址
		
		MsUserInfo() : status(1), userID(0) {}
	}MsUserInfo;

	/**
	* @brief  房间用户信息类
	*/
	typedef struct MsRoomUserInfo
	{
		uint32_t			userID;					// 用户ID
		MsString			userProfile;

		MsRoomUserInfo() : userID(0) {}
	}MsRoomUserInfo;

	typedef struct MsUserInfoRsp
	{
		/** @brief 返回状态 */
		int					status;
		/** 请求类型 */
		int					type;
		/** @brief 用户信息 */
		MsUserInfo			userInfo;

		MsUserInfoRsp() :status(0) {}
	}MsUserInfoRsp;

	/** @brief 登陆回复 */
	typedef struct MsLoginRsp
	{
		int					status;
		uint64_t			roomID;					// 房间ID
		
		MsLoginRsp() : status(0), roomID(0) {}
	}MsLoginRsp;

	struct MsReconnectRsp
	{
		int					status;
		uint64_t			roomID;					// 房间ID

		MsReconnectRsp() : status(0), roomID(0) {}
	};

	/** @brief 退出回复 */
	typedef struct MsLogoutRsp
	{
		int					status;

		MsLogoutRsp() : status(0) {}
	}MsLogoutRsp;

	typedef struct MsRoomJoinOverRsp {
		int					status;
		MsString			cpProto;

		MsRoomJoinOverRsp() : status(0) {}
	}MsRoomJoinOverRsp;

	struct MsJoinOverNotifyInfo
	{
		uint64_t			roomId;
		uint32_t			srcUserId;				// 源玩家ID，建议废弃
		uint32_t			srcUserID;				// 源玩家ID，建议使用
		MsString			cpProto;

		MsJoinOverNotifyInfo() :roomId(0), srcUserId(0), srcUserID(0) {}
	};

	struct MsJoinOpenRsp
	{
		int					status;
		MsString			cpProto;

		MsJoinOpenRsp() : status(0) {}
	};

	struct MsJoinOpenNotify
	{
		uint64_t			roomId;
		uint32_t			srcUserId;				// 源玩家ID，建议废弃
		uint32_t			srcUserID;				// 源玩家ID，建议使用
		MsString			cpProto;

		MsJoinOpenNotify() :roomId(0), srcUserId(0), srcUserID(0) {}
	};

	typedef struct MsRoomInfo {
		uint64_t			roomID;
		MsString			roomProperty;
		uint32_t			owner;

		MsRoomInfo() : roomID(0), owner(0) {}
	} MsRoomInfo;

	/** @brief 进入房间回复 */
	typedef struct MsRoomJoinRsp
	{
		int					status;
		uint32_t			state;
		std::vector<MsRoomUserInfo>		userInfo_v;
		MsRoomInfo			roomInfo;

		MsRoomJoinRsp() : status(0), state(0) {}
	}MsRoomJoinRsp;

	/** @brief 退出房间回复 */
	typedef struct MsRoomLeaveRsp
	{
		/** @brief 退出状态 */
		int					status;

		/** @brief 房间id */
		uint64_t			roomID;

		/* 用户id */
		int					userID;

		/** @brief 消息 */
		MsString			cpProto;
	
		MsRoomLeaveRsp() : status(0), roomID(0), userID(0) {}
	}MsRoomLeaveRsp;

	struct MsLeaveRoomNotifyInfo
	{
		uint64_t			roomId;					// 离开的房间ID
		uint32_t			userId;					// 离开的玩家ID，建议废弃
		uint32_t			userID;					// 离开的玩家ID，建议使用
		uint32_t			owner;					// 当前房主ID
		MsString			cpProto;				// 自定义内容

		MsLeaveRoomNotifyInfo() : roomId(0), userId(0), userID(0), owner(0) {}
	};

	typedef struct MsSendEventRsp {
		int32_t				status;
		int32_t				seq;

		MsSendEventRsp() : status(0), seq(0) {}
	}MsSendEventRsp;
	
	typedef struct MsSendEventNotify {
		uint32_t			srcUserID;
		MsString			cpProto;

		MsSendEventNotify() : srcUserID(0) {}
	}MsSendEventNotify;

	struct MsGameServerNotifyInfo
	{
		uint32_t			srcUserID;
		MsString			cpProto;

		MsGameServerNotifyInfo() : srcUserID(0) {}
	};

	typedef struct MsNetworkStateNotify {
		uint64_t			roomID;
		uint32_t			userID;
		uint32_t			state;
		uint32_t			owner;

		MsNetworkStateNotify() : roomID(0), userID(0), state(0), owner(0) {}
	}MsNetworkStateNotify;

	typedef struct MsSubscribeEventGroupRsp {
		int					status;
		std::vector<MsString> groups;
	}MsSubscribeEventGroupRsp;

	typedef struct MsSendEventGroupRsp {
		int32_t				status;
		int32_t				dstNum;
	}MsSendEventGroupRsp;

	typedef struct MsSendEventGroupNotify {
		uint32_t			srcUid;					// 源玩家ID，建议废弃
		uint32_t			srcUserID;				// 源玩家ID，建议使用
		std::vector<MsString>	groups;
		MsString			cpProto;

		MsSendEventGroupNotify() : srcUid(0), srcUserID(0) {}
	}MsSendEventGroupNotify;

	typedef struct MsCreateRoomInfo {
		MsString			name;					// 房间名称
		uint32_t			maxPlayer;				// 最大玩家数
		int32_t				mode;					// 模式
		int32_t				canWatch;				// 是否可观战（1：可观战；2：不可见）
		int32_t				visibility;				// 是否可见（0：不可见；1：可见）
		MsString			roomProperty;			// 房间属性

		MsCreateRoomInfo() : maxPlayer(0), mode(0), canWatch(0), visibility(0) {}
	}MsCreateRoomInfo;

	typedef struct MsCreateRoomRsp {
		int32_t				status;
		uint64_t			roomID;
		uint32_t			owner;					// 房主

		MsCreateRoomRsp() : status(0), roomID(0), owner(0) {}
	}MsCreateRoomRsp;

	typedef struct MsRoomFilter {
		uint32_t			maxPlayer;				// 最大玩家数
		int32_t				mode;					// 模式
		int32_t				canWatch;				// 是否可观战
		MsString			roomProperty;			// 房间属性

		MsRoomFilter() : maxPlayer(0), mode(0), canWatch(0) {}
	}MsRoomFilter;

	struct MsRoomFilterEx
	{
		uint32_t			maxPlayer;				// 最大玩家数
		int32_t				mode;					// 模式
		int32_t				canWatch;				// 是否可观战
		MsString			roomProperty;			// 房间属性
		int32_t				full;
		RoomState			state;
		RoomListSort		sort;
		SortOrder			order;
		int32_t				pageNo;
		int32_t				pageSize;

		MsRoomFilterEx() : maxPlayer(0), mode(0), canWatch(0), full(0), state(ROOM_STATE_NIL), sort(ROOM_SORT_NIL), order(SORT_ASC), pageNo(0), pageSize(10) {}
	};

	typedef struct MsRoomInfoEx {
		uint64_t			roomID;					// 房间ID
		MsString			roomName;
		uint32_t			maxPlayer;
		int32_t				mode;					// 模式
		int32_t				canWatch;				// 是否可观战
		MsString			roomProperty;			// 房间属性

		MsRoomInfoEx() : roomID(0), maxPlayer(0), mode(0), canWatch(0) {}
	}MsRoomInfoEx;

	typedef struct MsRoomListRsp {
		int32_t				status;
		std::vector<MsRoomInfoEx> roomInfos;

		MsRoomListRsp() : status(0) {}
	}MsRoomListRsp;

	struct MsRoomAttribute
	{
		uint64_t			roomId;					// 房间ID
		MsString			roomName;
		uint32_t			maxPlayer;
		uint32_t			gamePlayer;				// 游戏人数
		uint32_t			watchPlayer;			// 观战人数
		int32_t				mode;					// 模式
		int32_t				canWatch;				// 是否可观战
		MsString			roomProperty;			// 房间属性
		uint32_t			owner;
		RoomState			state;
		uint64_t			createTime;

		MsRoomAttribute() : roomId(0), maxPlayer(0), gamePlayer(0), watchPlayer(0), mode(0), canWatch(0), owner(0), state(ROOM_STATE_NIL), createTime(0){}
	};

	struct MsGetRoomListExRsp
	{
		int32_t				status;
		int32_t				total;
		std::vector<MsRoomAttribute> roomAttrs;

		MsGetRoomListExRsp() : status(0), total(0) {}
	};

	typedef struct MsMatchInfo {
		uint32_t			maxPlayer;				// 最大玩家数
		int32_t				mode;					// 模式
		int32_t				canWatch;				// 是否可观战
		std::map<MsString, MsString> tags;			// 匹配标签

		MsMatchInfo() : maxPlayer(0), mode(0), canWatch(0) {}
	}MsMatchInfo;

	struct MsKickPlayerRsp {
		int32_t				status;
		uint32_t			owner;					// 房主
		uint32_t			userID;					// 被踢玩家ID

		MsKickPlayerRsp() : status(0), owner(0), userID(0) {}
	};

	typedef struct MsKickPlayerNotify {
		uint32_t			srcUserID;				// 踢人者
		uint32_t			userID;					// 被踢者
		MsString			cpProto;
		uint32_t			owner;

		MsKickPlayerNotify() : srcUserID(0), userID(0), owner(0) {}
	}MsKickPlayerNotify;

	struct MsSetChannelFrameSyncRsp {
		int32_t				status;

		MsSetChannelFrameSyncRsp() : status(0) {}
	};

	struct MsFrameItem {
		uint32_t			srcUserID;
		MsString			cpProto;
		uint64_t			timestamp;

		MsFrameItem() : srcUserID(0), timestamp(0) {}
	};

	struct MsFrameData {
		int32_t				frameIndex;
		std::list<MsFrameItem> frameItems;
		int32_t				frameWaitCount;

		MsFrameData() : frameIndex(1), frameWaitCount(0) {}
	};

	struct MsSendFrameEventRsp
	{
		int32_t				status;

		MsSendFrameEventRsp() : status(0) {}
	};

	struct MsGetRoomDetailRsp
	{
		int32_t				status;
		RoomState			state;
		uint32_t			maxPlayer;
		int32_t				mode;
		int32_t				canWatch;
		MsString			roomProperty;
		uint32_t			owner;
		uint32_t			createFlag;
		std::list<MsRoomUserInfo> userInfos;

		MsGetRoomDetailRsp() : status(0), state(ROOM_STATE_NIL), maxPlayer(0), mode(0), canWatch(0), owner(0), createFlag(0) {}
	};

	struct MsSetRoomPropertiesRsp
	{
		int32_t				status;
		uint64_t			roomID;
		uint32_t			srcUserID;
		MsString			roomProperty;

		MsSetRoomPropertiesRsp() : status(0), roomID(0), srcUserID(0) {}
	};

	struct MsSetRoomPropertiesNotify
	{
		uint64_t			roomID;
		uint32_t			srcUserID;
		MsString			roomProperty;

		MsSetRoomPropertiesNotify() : roomID(0), srcUserID(0) {}
	};
}

#endif//__MATCH_VS_STRUCT_H__

