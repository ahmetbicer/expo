// Copyright 2018-present 650 Industries. All rights reserved.

#if __has_include(<EXNotifications/EXNotificationsEmitter.h>)

#import <EXNotifications/EXNotificationsEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface EXScopedNotificationsEmitter : EXNotificationsEmitter

- (instancetype)initWithExperienceId:(NSString *)experienceId;

@end

NS_ASSUME_NONNULL_END

#endif
