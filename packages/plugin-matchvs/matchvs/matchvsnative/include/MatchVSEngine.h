#ifndef __MATCHVS_APP_H__
#define __MATCHVS_APP_H__

#include "MatchVSResponse.h"

namespace matchvs
{
	class MsWorker;

	/** @brief MatchVS SDK用户接口（API）  */
	class DLL_API MatchVSEngine
	{
	public:
		virtual ~MatchVSEngine();
		
	private:
		MatchVSEngine(void);
		MatchVSEngine(const MatchVSEngine& obj);
		MatchVSEngine& operator=(const MatchVSEngine& obj);

	public:
		/**
		* @brief 获取sdk版本号
		* @return sdk版本号
		*/
		static const char *getVersion();

		/**
		* @brief 获取MatchVSEngine
		* @return MatchVSEngine*
		*/
		static MatchVSEngine *getInstance();

		/**
		* @brief 初始化对战引擎
		* @param pMatchVSResponse MatchVSResponse派生类指针
		* @param channel 渠道
		* @param platform 平台
		* @param gameid 游戏ID
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t init(MatchVSResponse *pMatchVSResponse, const MsString &channel, const MsString &platform, uint32_t gameID);

		/**
		* @brief 独立部署版初始化对战引擎
		* @param response MatchVSResponse派生类指针
		* @return MATCHVS_OK: 正确；其他值：错误
		*/
		int32_t premiseInit(MatchVSResponse *response, const MsString &endPoint);

		/**
		* @brief 反初始化对战引擎
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t uninit();
		
		/**
		* @brief 注册账号
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t registerUser();

//		int32_t getGatewayList(const MsString &channel, const MsString &platform, uint32_t userId, const MsString &token);

		/**
		* @brief 登录游戏
		* @param userid 用户ID
		* @param token 用户Token
		* @param gameid 游戏ID
		* @param gameversion 游戏版本号
		* @param pAppKey 游戏App key
		* @param secretkey 游戏secret
		* @param deviceid 设备ID
		* @param gatewayid 网关ID
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t login(int userid, const MsString &token, int gameid, int gameversion, const MsString &appkey, 
			const MsString &secretkey, const MsString &deviceid, int gatewayid);

		/**
		* @brief 登出游戏
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t logout();

		int32_t reconnect();

		/**
		* @brief 创建房间
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t createRoom(const MsCreateRoomInfo &roomInfo, const MsString &userProfile);

		int32_t getRoomList(const MsRoomFilter &filter);
		int32_t getRoomListEx(const MsRoomFilterEx &filter);

		int32_t getRoomDetail(uint64_t roomId);

		int32_t setRoomProperties(uint64_t roomID, const MsString &roomProperty);

		/**
		* @brief 加入随机房间
		* @param iMaxPlayer 最大玩家数
		* @param strUserProfile  玩家简介
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t joinRandomRoom(uint32_t iMaxPlayer, const MsString &userProfile);
		int32_t joinRoomWithProperties(const MsMatchInfo &matchInfo, const MsString &userProfile);
		int32_t joinRoom(uint64_t roomID, const MsString &userProfile);

		/**
		* @brief 房间停止加人
		* @param cpProto 负载数据
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t joinOver(const MsString &cpProto);

		int32_t joinOpen(const MsString &cpProto);

		/**
		* @brief 退出房间
		* @param cpProto 负载数据
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t leaveRoom(const MsString &cpProto);

		int32_t kickPlayer(uint32_t userID, const MsString &cpProto);

		/**
		* @brief 发送消息
		* @param type 消息类型。0表示转发给其他玩家；1表示转发给game server；2表示转发给其他玩家及game server
		* @param cpProto 消息内容
		* @param targetType 目标类型。0表示发送目标为pTargetUserId；1表示发送目标为除pTargetUserId以外的房间其他人
		* @param targetSize user id个数
		* @param targetUserId user id数组
		* @return MATCHVS_OK: 正确，其他值：错误
		*/
		int32_t sendEvent(const MsString &cpProto, int &seq);
		int32_t sendEvent(int type, const MsString &cpProto, int targetType, int targetSize, const uint32_t *targetUserId, int &seq);
		
		// 订阅与发布
		int32_t subscribeEventGroup(const std::vector<MsString> &subGroups, const std::vector<MsString> &unsubGroups);
		int32_t sendEventGroup(const MsString &cpProto, std::vector<MsString> &groups);

		// 帧同步
		int32_t setFrameSync(int32_t frameRate);
		int32_t sendFrameEvent(const MsString &cpProto);

	private:
		MsWorker*              m_pWorker;
	};
}

#endif//__MATCHVS_MSG_CLIENT_H__
