import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from "@/components/ui/accordion";
import { Icon } from "@/components/ui/icon";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Divider } from "@/components/ui/divider";

const FAQ = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#38BF64" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Guest FAQ */}
          <View>
            <Text style={styles.title}>GUEST FAQ</Text>
          </View>
          <View>
            {/* Card */}
            <View>
              <Accordion
                size="md"
                variant="filled"
                type="single"
                isCollapsible={true}
                isDisabled={false}
                className="m-5 w-[90%] border border-outline-200"
              >
                <AccordionItem value="a">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What time does gates open?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      2PM until the park closes.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
                <Divider />
                <AccordionItem value="b">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What time do gates close?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      1 hour before the event is over.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
                <Divider />
                <AccordionItem value="c">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Can we bring food?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      You cannot bring food; however, you can bring snacks!
                      There will be food vendors available for all palates.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="d">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What kind of snacks can we bring?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Chips, cookies and fruit are all perfectly fine! Please
                      remember to keep our park beautiful and dispose properly
                      of any wrappers you bring in.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="e">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Can we bring a cooler?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      You can bring a cooler with the purchase of a cooler pass
                      if you would like to bring your beverages. (Glass is not
                      allowed, however; all drinks must be in a plastic
                      container) However, there will be bars on site to purchase
                      drinks. If you do not purchase a cooler pass unfortunately
                      no coolers.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="f">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Who will be performing?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      This event will have mostly DJs - it's all about the vibe
                      and interactions! We will have a yoga segment., speakers
                      and hosts - even comedians!
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="g">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What's the difference between Express tickets and
                              general?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      There will be a fast express lane for Express ticket
                      holders. They will be able to get right in without any
                      real line. GA ticket holders will have to get in the
                      general admission line.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="h">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Can we bring a tent?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      No you cannot, as tents may block the view for other
                      attendees or cause a safety hazard in the general crowd.
                      You CAN bring blankets, pillows & lawn chairs to make
                      yourself comfortable.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="i">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Can you bring a wagon?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      No unless you have ADA requirements/needs.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="j">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What comes with the VIP Tent Package?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      They come with VIP wrist bands for 10+ guests, 10x10 tent
                      and couch.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="k">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What happens if it rains?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      We will announce a rain date.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="l">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Are tickets refundable?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Tickets Are Non-refundable.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="m">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Should I bring cash?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Yes cash will be accepted at the door.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="n">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Are there special tickets for children?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Children above 7 years old require general admission
                      tickets.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="o">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Can I purchase tickets at the festival door?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Yes, tickets are available at the park.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="p">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Can I re-enter if I exit the festival?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      No re-entry allowed.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="q">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Is there a bag policy if so what is it?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      You may bring personal items in a bag, however, all bags
                      are subject to search.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="r">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Items permitted?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Blankets NO LARGER THAN A THROW BLANKET , lawn chairs,
                      snacks, cooler, ice, umbrella .
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="s">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Items not permitted?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      No Liquids, No Alcohol, No personal tents, No Hot/Cooked
                      Foods.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="t">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What if I lose an item?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Approach any security point for questions on lost and
                      found items.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="u">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Where to park for High Point R&B Soul Picnic?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      There is designated parking with a paid parking pass.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="v">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Where to enter High Point RNB SOUL PICNIC?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      2 Entrances available near VIP Parking and the main
                      entrance of the park.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="w">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Is there rideshare area?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>Yes it is.</AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </View>
          </View>

          {/* VENDOR FAQ */}
          <View className="mt-10">
            <Text style={styles.title}>VENDOR FAQ</Text>
          </View>
          <View>
            {/* Card */}
            <View>
              <Accordion
                size="md"
                variant="filled"
                type="single"
                isCollapsible={true}
                isDisabled={false}
                className="m-5 w-[90%] border border-outline-200"
              >
                <AccordionItem value="a">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Are you looking for vendors?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>Yes.</AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
                <Divider />
                <AccordionItem value="b">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              How can we apply for vending?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      There is a link on the website for vendor application.
                      Fill out the online application and our vendor coordinator
                      will get right back to you.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
                <Divider />
                <AccordionItem value="c">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              What is the cost for vending?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Prices vary per city. Contact the email below for details.
                      The options available are: Non food vendors (10x10 space)
                      Non-truck food vendors (10X10 space) Food truck vendor
                      (10x20 space).
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="d">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              How many people will be expected?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      We can not guarantee anything but our capacity is 20,000
                      people.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="e">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              When is load in time?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Vendor coordinator will provide details to reflect your
                      specific event load in times.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="f">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Will there be overnight security?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>Yes.</AccordionContentText>
                  </AccordionContent>
                </AccordionItem>

                <Divider />
                <AccordionItem value="g">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              Who can I contact about vendors?
                            </AccordionTitleText>
                            {isExpanded ? (
                              <Icon
                                as={ChevronUpIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            ) : (
                              <Icon
                                as={ChevronDownIcon}
                                className="text-typography-500 m-2 w-4 h-4"
                              />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      Brandon Black (brandon@yorkpromotions.com) *High Point, NC
                      please contact Dana East (deast@visithighpoint.com)
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20%",
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "black",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100%",
  },
  card: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "inset 0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
    // padding: 5,
  },
});

export default FAQ;
